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

// User API's
// Get all users
app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(data.users);
});

// Add new user
app.post('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const newUser = req.body;
    newUser.id = data.users.length + 1;
    data.users.push(newUser);
    fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newUser);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const user = data.users.find(user => user.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update a specific user by ID
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...req.body }; // Merge existing user data with new data
        fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete a specific user by ID
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        data.users.splice(userIndex, 1);
        fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


// Post APi's
// Get posts based on multiple criteria
app.get('/posts', (req, res) => {
    const { date, start, end } = req.query;
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    let filteredPosts = [...data.posts];

    if (date) {
        filteredPosts = filteredPosts.filter(post => post.startDate === date);
    }

    if (start) {
        filteredPosts = filteredPosts.filter(post => post.startLocation === start);
    }

    if (end) {
        filteredPosts = filteredPosts.filter(post => post.endLocation === end);
    }

    if (filteredPosts.length > 0) {
        res.json(filteredPosts);
    } else {
        res.status(404).json({ error: 'No posts matching the specified criteria found' });
    }
});

// Get all posts
app.get('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    res.json(data.posts);
});

// Add new post
app.post('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const newPost = req.body; 
    newPost.id = data.posts.length + 1;
    data.posts.push(newPost);
    fs.writeFileSync(postDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newPost);
});

// Get a specific post by ID
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const post = data.posts.find(post => post.id === id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update a specific user by ID
app.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const postIndex = data.posts.findIndex(post => post.id === id);

    if (postIndex !== -1) {
        data.posts[postIndex] = { ...data.posts[postIndex], ...req.body }; // Merge existing user data with new data
        fs.writeFileSync(postDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'Post updated successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Delete a specific post by ID
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const postIndex = data.posts.findIndex(post => post.id === id);

    if (postIndex !== -1) {
        data.posts.splice(postIndex, 1);
        fs.writeFileSync(postDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});


// Reservation API's
// Get all reservations
app.get('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    res.json(data.reservations);
});

// Add new reservation
app.post('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    const newReservation = req.body; 
    newReservation.id = data.reservations.length + 1;
    data.reservations.push(newReservation);
    fs.writeFileSync(reservationDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newReservation);
});

// Get a specific reservation by ID
app.get('/reservations/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    const reservation = data.reservations.find(reservation => reservation.id === id);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

// Update a specific user by ID
app.put('/reservations/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    const reservationIndex = data.reservations.findIndex(reservation => reservation.id === id);

    if (reservationIndex !== -1) {
        data.reservations[reservationIndex] = { ...data.reservations[reservationIndex], ...req.body }; // Merge existing user data with new data
        fs.writeFileSync(reservationDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'Reservation updated successfully' });
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

// Delete a specific reservation by ID
app.delete('/reservations/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    const reservationIndex = data.reservations.findIndex(reservation => reservation.id === id);

    if (reservationIndex !== -1) {
        data.reservations.splice(reservationIndex, 1);
        fs.writeFileSync(reservationDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'Reservation deleted successfully' });
    } else {
        res.status(404).json({ error: 'Reservation not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});