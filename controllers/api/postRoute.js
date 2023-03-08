const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const { Posts } = require('../../models');

// new post route
router.post("/", withAuth, async (req, res) => {
    try {
      const newPost = await Posts.create({
        ...req.body,
        user_id: req.session.user.id,
      });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   get all posts
  router.get('/feed', async (req, res) => {
    try {
      const postData = await Posts.findAll({
        attributes: ['title', 'content'] ,
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('feed', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get single post
  router.get('/:id', async (req, res) => {
    try {
      const postData = await Posts.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // update post route
  router.put("/:id", withAuth, async (req, res) => {
    try {
      const updatePost = await Posts.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!updatePost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//   Delete post route
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deleteData = await Posts.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!deleteData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(deleteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;