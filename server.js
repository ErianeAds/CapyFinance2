import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Log de erros globais para debug no Vercel
process.on('uncaughtException', (err) => console.error('🚫 Erro Crítico:', err));
process.on('unhandledRejection', (reason, promise) => console.error('⚠️ Rejeição não tratada:', reason));

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Suporte a rede local
app.use((req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Rota de diagnóstico para o Vercel confirmar que o servidor está no ar
app.get('/', (req, res) => res.json({ status: 'OK (Backend na Railway ativo!)' }));

// Database Setup - Using better-sqlite3 for synchronous and faster operations
const db = new Database('./capyfinance.db');
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

const usersCount = db.prepare("SELECT COUNT(*) as count FROM users").get();

if (usersCount && usersCount.count === 0) {
  const insertUser = db.prepare(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
  );

  insertUser.run('admin@capyfinance.com', 'admin123', 'admin');
  insertUser.run('user@capyfinance.com', 'user123', 'user');

  console.log('Usuários iniciais criados com sucesso.');
}
// Seed Data
const countRow = db.prepare("SELECT COUNT(*) as count FROM market_metrics").get();
if (countRow && countRow.count === 0) {
  const metrics = [
    ['Ibovespa', 128452.10, 1.2],
    ['Selic', 10.75, 0],
    ['IPCA', 4.51, 0.3],
    ['USD/BRL', 4.92, -0.05]
  ];
  const insert = db.prepare(`INSERT INTO market_metrics (symbol, value, change) VALUES (?, ?, ?)`);
  metrics.forEach(([symbol, value, change]) => {
    insert.run(symbol, value, change);
  });
}

const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
if (userCount && userCount.count === 0) {
  const users = [
    ['admin@capyfinance.com', 'admin123', 'admin'],
    ['user@capyfinance.com', 'user123', 'user']
  ];
  const insert = db.prepare(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`);
  users.forEach(([email, password, role]) => {
    insert.run(email, password, role);
  });
  console.log('🌿 Seeded default users.');
}

// --- API ENDPOINTS ---
app.get('/api/metrics', (req, res) => {
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
    const row = db
      .prepare("SELECT * FROM users WHERE email = ? AND password = ?")
      .get(email, password);

    if (!row) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({
      success: true,
      user: {
        email: row.email,
        role: row.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

//Cadastrar
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já cadastrado' });
    }

    db.prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)")
      .run(email, password, 'user');

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso'
    });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Outros endpoints como cursos, etc...
app.get('/api/courses', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM courses").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/valuations/latest', (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM valuations ORDER BY created_at DESC LIMIT 1").get();
    res.json(row || { lodge_name: 'Pantanal Eco-Lodge', equity_value: 12400000, revenue: 4200000, ebitda_margin: 32.4, growth_rate: 12.5 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Somente inicia o listener se NÃO estivermos no ambiente do Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
