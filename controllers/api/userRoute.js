const express = require('express');
const router = express.Router();
const { User, Posts } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
      const feedData = await Posts.findAll({
        attributes: ['title', 'content'] ,
      });
  
      const feed = feedData.map((project) => project.get({ plain: true }));
  
      res.render('feed', {
        feed,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/user/:username_email', async (req, res) => {
    // const userEmail = document.cookie
    const userData = await User.findOne({ where: { username_email: req.params.username_email  } })
    return res.json(userData);
    });


   // get all posts
   router.get('/posts', async (req, res) => {
    const postData = await Posts.findAll()
    return res.json(postData);
    });

    // create new user
    router.post('/', async (req, res) => {
        try {
          const userData = await User.create({
            username_email: req.body.username_email,
            password: req.body.password,
          });
      
          req.session.save(() => {
            req.session.loggedIn = true;
      
            res.status(200).json(userData);
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });

      // create new post
router.post('/posts/user/:id', async (req, res) => {
    try {
      const postData = await Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.params.id,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(postData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username_email: req.body.username_email } 
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username_email = userData.username_email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// User Logout
router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;