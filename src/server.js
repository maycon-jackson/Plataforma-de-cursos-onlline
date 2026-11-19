import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import matriculaRoutes from './routes/matriculaRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ok', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/cursos', cursoRoutes);
app.use('/matriculas', matriculaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

