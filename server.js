const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({msg: 'It is running!'}));

app.use('/api/todos', require('./routes/todos'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));