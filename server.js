import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
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

// Database Setup (Nota: No Vercel o SQLite é somente leitura por padrão após o deploy)
const db = new sqlite3.Database('./capyfinance.db', (err) => {
  if (err) console.error('🔴 Database connection error:', err);
  else console.log('🌿 Connected to CapyFinance SQLite Database.');
});

// Initialize Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS market_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT UNIQUE,
    value REAL,
    change REAL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS valuations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lodge_name TEXT,
    equity_value REAL,
    revenue REAL,
    ebitda_margin REAL,
    growth_rate REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS courses (
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

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`);

  // Seed Data
  db.get("SELECT COUNT(*) as count FROM market_metrics", (err, row) => {
    if (row && row.count === 0) {
      const metrics = [
        ['Ibovespa', 128452.10, 1.2],
        ['Selic', 10.75, 0],
        ['IPCA', 4.51, 0.3],
        ['USD/BRL', 4.92, -0.05]
      ];
      metrics.forEach(([symbol, value, change]) => {
        db.run(`INSERT INTO market_metrics (symbol, value, change) VALUES (?, ?, ?)`, [symbol, value, change]);
      });
    }
  });
});

// --- API ENDPOINTS ---
app.get('/api/metrics', (req, res) => {
  db.all("SELECT * FROM market_metrics", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!row) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ success: true, user: { email: row.email, role: row.role } });
  });
});

// Outros endpoints como cursos, etc...
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/valuations/latest', (req, res) => {
  db.get("SELECT * FROM valuations ORDER BY created_at DESC LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { lodge_name: 'Pantanal Eco-Lodge', equity_value: 12400000, revenue: 4200000, ebitda_margin: 32.4, growth_rate: 12.5 });
  });
});

// Somente inicia o listener se NÃO estivermos no ambiente do Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
