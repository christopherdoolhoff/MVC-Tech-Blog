const express = require('express');
const withAuth = require('../../utils/auth');
const router = express.Router();

// post new comment route
router.post("/", withAuth, async (req, res) => {

    console.log(req.session)
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user.id,
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;