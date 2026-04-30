const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// File save panna 'uploads' folder create pandrom
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer setup - File-ah 'uploads' folder-la save panna
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// API Endpoint
app.post('/upload', upload.single('assignmentFile'), (req, res) => {
    console.log("Data received from Frontend!");
    console.log("Student Info:", req.body);
    console.log("File Info:", req.file);
    res.status(200).send({ message: "File uploaded successfully!" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});