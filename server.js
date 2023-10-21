const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.emv.PORT || 3000;
const userDataPath = 'users.json';

app.use(cors());

app.use(express.json());

app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(data.users);
});

app.post('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const newUser = req.body;
    newUser.id = data.users.length + 1;
    data.users.push(newUser);
    fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newUser);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});