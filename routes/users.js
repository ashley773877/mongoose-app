const express = require('express');
const router = express.Router();
const UserModel = require('../data/UserModel');
const error = require('../utilities/error');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await UserModel.find();
      res.json({ users });
    } catch (err) {
      next(error(500, err.message));
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, username, email } = req.body;
      if (await UserModel.findOne({ username })) {
        next(error(409, 'Username Already Taken'));
      } else {
        const user = new UserModel({ name, username, email });
        await user.save();
        res.json(user);
      }
    } catch (err) {
      next(error(400, err.message));
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        res.json({ user });
      } else {
        next(error(404, 'User Not Found'));
      }
    } catch (err) {
      next(error(500, err.message));
    }
  })
  .patch(async (req, res, next) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (user) {
        res.json(user);
      } else {
        next(error(404, 'User Not Found'));
      }
    } catch (err) {
      next(error(400, err.message));
    }
  })
  .delete(async (req, res, next) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (user) {
        res.json(user);
      } else {
        next(error(404, 'User Not Found'));
      }
    } catch (err) {
      next(error(500, err.message));
    }
  });

module.exports = router;