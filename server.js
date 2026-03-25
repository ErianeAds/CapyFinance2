import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';

const JWT_SECRET = process.env.JWT_SECRET || 'capy-secret-2024-keep-safe-in-production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet({
  contentSecurityPolicy: false, // Permitir iframes do YT e Drive
}));

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Suporte a rede local (Private Network Access)
app.use((req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});

app.use(bodyParser.json());

// Log de erros globais para debug no Vercel
process.on('uncaughtException', (err) => console.error('🚫 Erro Crítico:', err));
process.on('unhandledRejection', (reason, promise) => console.error('⚠️ Rejeição não tratada:', reason));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado: Somente administradores' });
  }
  next();
};

// caminho absoluto da pasta de áudio
const audioDir = path.join(__dirname, 'public', 'audio');

// cria a pasta se não existir
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${uniqueSuffix}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Arquivo inválido. Envie um áudio.'));
    }
  }
});

app.post('/api/upload-audio', authenticateToken, isAdmin, (req, res) => {
  upload.single('audio')(req, res, (err) => {
    console.log('DEBUG: req.file =', req.file); // Adicionado para debug
    if (err) {
      console.error('Erro no upload:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      console.warn('DEBUG: req.file is missing!');
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    res.json({
      success: true,
      url: `/audio/${req.file.filename}`
    });
  });
});

// servir arquivos do build
app.use(express.static(path.join(__dirname, 'dist')));

// servir áudios enviados
app.use('/audio', express.static(audioDir));

// Rota de diagnóstico para o Vercel confirmar que o servidor está no ar
app.get('/', (req, res) => res.json({ status: 'OK (Backend na Railway ativo!)' }));

// Database Setup - Using better-sqlite3 for synchronous and faster operations
const db = new Database(path.join(__dirname, 'capyfinance.db'));
console.log('🌿 Connected to CapyFinance SQLite Database (better-sqlite3).');

// Initialize Tables
db.exec(`CREATE TABLE IF NOT EXISTS market_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT UNIQUE,
  value REAL,
  change REAL,
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.exec(`CREATE TABLE IF NOT EXISTS valuations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lodge_name TEXT,
  equity_value REAL,
  revenue REAL,
  ebitda_margin REAL,
  growth_rate REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.exec(`CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  category TEXT,
  thumbnail TEXT,
  video_url TEXT,
  audio_url TEXT,
  slide_url TEXT,
  mindmap_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// Seed Data
const initialUsers = [
  { email: 'admin@capyfinance.com', password: 'admin123', role: 'admin' },
  { email: 'user@capyfinance.com', password: 'user123', role: 'user' },
  { email: 'eriane@capyfinance.com', password: 'eriane123', role: 'admin' }
];

initialUsers.forEach(({ email, password, role }) => {
  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!existing) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)").run(email, hashedPassword, role);
    console.log(`🌿 Perfil padrão criado: ${email} (${role})`);
  }
});

const updateMarketData = async () => {
  try {
    // 1. Dólar da AwesomeAPI (Gratuito, s/ Key)
    const usdResponse = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const usdData = await usdResponse.json();
    const usdBrl = parseFloat(usdData.USDBRL.bid);
    const usdChange = parseFloat(usdData.USDBRL.pctChange);

    // 2. Ibovespa & Inflação (HG Brasil - Tem limite sem key, mas excelente)
    const hgResponse = await fetch('https://api.hgbrasil.com/finance?format=json');
    const hgData = await hgResponse.json();
    
    // Ibovespa
    const ibov = hgData.results.stocks.IBOVESPA.points;
    const ibovVar = hgData.results.stocks.IBOVESPA.variation;

    // CDI (Aproximação Selic) e IPCA
    // Selic/IPCA do Bacen são mais lentos, usamos o seed do HG ou Bacen se disponível
    // HG retorna taxas do dia
    const selic = 10.75; // Valor padrão se falhar Bacen
    const ipca = 4.51;

    const upsert = db.prepare(`
      INSERT INTO market_metrics (symbol, value, change) 
      VALUES (?, ?, ?) 
      ON CONFLICT(symbol) DO UPDATE SET value=excluded.value, change=excluded.change, last_updated=CURRENT_TIMESTAMP
    `);

    upsert.run('Ibovespa', ibov, ibovVar);
    upsert.run('USD/BRL', usdBrl, usdChange);
    upsert.run('Selic', selic, 0);
    upsert.run('IPCA', ipca, 0.3);

    console.log('🔄 Mercado atualizado via API externa.');
  } catch (err) {
    console.error('❌ Erro ao buscar mercado via API:', err.message);
  }
};

// Iniciar atualização e agendar p/ cada 30 min
updateMarketData();
setInterval(updateMarketData, 30 * 60 * 1000);

const countRow = db.prepare("SELECT COUNT(*) as count FROM market_metrics").get();
if (countRow && countRow.count === 0) {
  const metrics = [
    ['Ibovespa', 128452.10, 1.2],
    ['Selic', 10.75, 0],
    ['IPCA', 4.51, 0.3],
    ['USD/BRL', 4.92, -0.05]
  ];
  const upsert = db.prepare(`INSERT INTO market_metrics (symbol, value, change) VALUES (?, ?, ?)`);
  metrics.forEach(([symbol, value, change]) => {
    upsert.run(symbol, value, change);
  });
  console.log('🌿 Market metrics seeded.');
}

// --- API ENDPOINTS ---
app.get('/api/metrics', authenticateToken, (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM market_metrics").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!row) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isValid = bcrypt.compareSync(password, row.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Credencial inválida' });
    }

    const token = jwt.sign(
      { id: row.id, email: row.email, role: row.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      email: row.email,
      role: row.role
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

//Cadastrar
app.post('/api/register', (req, res) => {
  const { email, password, admin_secret } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já cadastrado' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Define o cargo com base na chave secreta (Opcional)
    const role = (admin_secret === 'CAPY_ADM_2024') ? 'admin' : 'user';

    db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)")
      .run(email, hashedPassword, role);

    res.status(201).json({
      success: true,
      message: `Usuário (${role}) cadastrado com sucesso`
    });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Outros endpoints como cursos, etc...
app.get('/api/courses', authenticateToken, (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM courses ORDER BY id DESC").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', authenticateToken, isAdmin, (req, res) => {
  const { name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url } = req.body;
  try {
    const insert = db.prepare(`
      INSERT INTO courses (name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url);
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
});

app.post('/api/courses/update', authenticateToken, isAdmin, (req, res) => {
  const { id, name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url } = req.body;
  try {
    const update = db.prepare(`
      UPDATE courses 
      SET name = ?, description = ?, category = ?, thumbnail = ?, video_url = ?, audio_url = ?, slide_url = ?, mindmap_url = ?
      WHERE id = ?
    `);
    update.run(name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url, id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Erro ao atualizar curso' });
  }
});

app.post('/api/courses/delete', authenticateToken, isAdmin, (req, res) => {
  const { id } = req.body;
  try {
    db.prepare("DELETE FROM courses WHERE id = ?").run(id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Erro ao excluir curso' });
  }
});


app.get('/api/valuations/latest', authenticateToken, (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM valuations ORDER BY created_at DESC LIMIT 1").get();
    res.json(row || { lodge_name: 'Pantanal Eco-Lodge', equity_value: 12400000, revenue: 4200000, ebitda_margin: 32.4, growth_rate: 12.5 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/valuations', authenticateToken, isAdmin, (req, res) => {
  const { lodge_name, equity_value, revenue, ebitda_margin, growth_rate } = req.body;
  try {
    const insert = db.prepare(`
      INSERT INTO valuations (lodge_name, equity_value, revenue, ebitda_margin, growth_rate) 
      VALUES (?, ?, ?, ?, ?)
    `);
    insert.run(lodge_name, equity_value, revenue, ebitda_margin, growth_rate);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error creating valuation:', err);
    res.status(500).json({ error: 'Erro ao criar valuation' });
  }
});

app.post('/api/delete-audio', authenticateToken, isAdmin, (req, res) => {
  const { audio_url } = req.body;
  if (!audio_url) return res.status(400).json({ error: 'URL do áudio não fornecida' });
  try {
    const fileName = audio_url.split('/').pop();
    const filePath = path.join(audioDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Áudio deletado: ${fileName}`);
      res.json({ success: true });
    } else {
      res.json({ success: true, warning: 'Arquivo não existe' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar arquivo' });
  }
});

// Somente inicia o listener se NÃO estivermos no ambiente do Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
