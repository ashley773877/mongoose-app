const express = require('express');
const router = express.Router();
const PostModel = require('../data/PostModel');
const error = require('../utilities/error');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const posts = await PostModel.find();
      res.json({ posts });
    } catch (err) {
      next(error(500, err.message));
    }
  })
  .post(async (req, res, next) => {
    try {
      const { userId, title, content } = req.body;
      const post = new PostModel({ userId, title, content });
      await post.save();
      res.json(post);
    } catch (err) {
      next(error(400, err.message));
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post) {
        res.json({ post });
      } else {
        next(error(404, 'Post Not Found'));
      }
    } catch (err) {
      next(error(500, err.message));
    }
  })
  .patch(async (req, res, next) => {
    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (post) {
        res.json(post);
      } else {
        next(error(404, 'Post Not Found'));
      }
    } catch (err) {
      next(error(400, err.message));
    }
  })
  .delete(async (req, res, next) => {
    try {
      const post = await PostModel.findByIdAndDelete(req.params.id);
      if (post) {
        res.json(post);
      } else {
        next(error(404, 'Post Not Found'));
      }
    } catch (err) {
      next(error(500, err.message));
    }
  });

module.exports = router;
