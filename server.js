const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist/')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
