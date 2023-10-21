const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const userDataPath = 'users.json';
const postDataPath = 'posts.json';
const reservationDataPath = 'reservations.json';

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

app.get('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    res.json(data.posts);
});

app.post('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const newPost = req.body; 
    newPost.id = data.posts.length + 1;
    data.posts.push(newPost);
    fs.writeFileSync(postDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newPost);
});
/*
app.get('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(data.reservations);
});

app.post('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const newPost = req.body; /// Change this??
    newPost.id = data.posts.length + 1;
    data.posts.push(newPost);
    fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newReservation);
});
*/
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});