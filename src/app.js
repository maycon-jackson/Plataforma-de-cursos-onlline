const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/cursos', cursoRoutes);
app.use('/matriculas', matriculaRoutes);


module.exports = app;