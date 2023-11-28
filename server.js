const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const Post = require('./post');

// Connect to MongoDB
mongoose.connect('mongodb+srv://michelleamazinglin:G2fUwnMtw89W5IbW@cluster0.1cnehkx.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database");
});

// Multer setup for file handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
  });
  
  const upload = multer({storage: storage});

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.post('/api/posts', upload.single('image'), async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      date: req.body.date,
      body: req.body.body,
      image: req.file.path  // This will be the path where multer saves the image
    });
    
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.get('/api/posts/:id', getPost, (req, res) => {
    res.json(res.post);
  });

async function getPost(req, res, next) {
    let post;
  
    try {
      post = await Post.findById(req.params.id);
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find post' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.post = post;
    next();
  }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


