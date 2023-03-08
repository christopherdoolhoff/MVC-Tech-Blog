const express = require('express');
const app = express();
const router = express.Router();

//array to store the posts
let posts = [];

router.post("/api/posts", (req, res) => {
// Get the post content from the request body
const content = req.body.content;

if (!content) {
    return res.status(400).json({ error: "Post content is required" });
  }
  
  const newPost = { id: Date.now(), content };
  posts.push(newPost);
  
  // Send a success response to the client
  res.json({ message: "Post created successfully", post: newPost });
});

//route for the feed page
router.get('/feed', (req, res) => {
res.render('feed', { title: 'Title of Place', description: 'Description of Place', link: 'Link to Category Place', posts });
});

app.use(express.json());
app.use(router);
app.listen(3000, () => {
console.log('Server is running on port 3000');
});

module.exports = router;