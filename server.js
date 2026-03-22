import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true, // Reflects the request origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Helper for Private Network Access (some modern browsers require this for localhost)
app.use((req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Database Setup
const db = new sqlite3.Database('./capyfinance.db', (err) => {
  if (err) console.error('🔴 Database connection error:', err);
  else console.log('🌿 Connected to CapyFinance SQLite Database.');
});

// Initialize Tables
db.serialize(() => {
  // Market Metrics
  db.run(`CREATE TABLE IF NOT EXISTS market_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT UNIQUE,
    value REAL,
    change REAL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Valuations
  db.run(`CREATE TABLE IF NOT EXISTS valuations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lodge_name TEXT,
    equity_value REAL,
    revenue REAL,
    ebitda_margin REAL,
    growth_rate REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Courses (Hotmart style)
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

  // Users (for Login simulation)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`);

  // Seed Data (if empty)
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

  db.get("SELECT COUNT(*) as count FROM courses", (err, row) => {
    if (row && row.count === 0) {
      const courses = [
        ['Estratégia do Pantanal', 'Conceitos avançados de gestão inspirados no ecossistema.', 'Finanças', 'https://images.unsplash.com/photo-1590424753858-3b6b1f31b6df?w=800&q=80', 'https://youtube.com/example', 'https://spotify.com/example', 'https://googledrive.com/slides', 'https://mindmap.com/example'],
        ['Valuation Orgânico', 'Como avaliar empresas de forma sustentável.', 'Avaliação', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', '', '', '', '']
      ];
      courses.forEach(([name, desc, cat, thumb, video, audio, slide, mindmap]) => {
        db.run(`INSERT INTO courses (name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, desc, cat, thumb, video, audio, slide, mindmap]);
      });
    }
  });

  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row && row.count === 0) {
      db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, ['admin@capyfinance.com', 'admin123', 'admin']);
      db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, ['user@capyfinance.com', 'user123', 'user']);
    }
  });
});

// --- API ENDPOINTS ---

// Auth (Simulation)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!row) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ success: true, user: { email: row.email, role: row.role } });
  });
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Dados incompletos' });

  db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, 'user'], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'E-mail já cadastrado' });
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Market Metrics
app.get('/api/metrics', (req, res) => {
  db.all("SELECT * FROM market_metrics", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Courses
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/courses', (req, res) => {
  const { name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url } = req.body;
  const query = `INSERT INTO courses (name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

app.post('/api/courses/update', (req, res) => {
  const { id, name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url } = req.body;
  const query = `UPDATE courses SET name = ?, description = ?, category = ?, thumbnail = ?, video_url = ?, audio_url = ?, slide_url = ?, mindmap_url = ? WHERE id = ?`;
  db.run(query, [name, description, category, thumbnail, video_url, audio_url, slide_url, mindmap_url, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Valuations
app.get('/api/valuations/latest', (req, res) => {
  db.get("SELECT * FROM valuations ORDER BY created_at DESC LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { lodge_name: 'Pantanal Eco-Lodge', equity_value: 12400000, revenue: 4200000, ebitda_margin: 32.4, growth_rate: 12.5 });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
