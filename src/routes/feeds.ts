import express from 'express';

import { feed } from '../models/feed';

var router = express.Router();

router.post('/createPost', (req, res) => {
  const { title, description, images, labels } = req.body;

  const user = req['user'];
  const requestDate = new Date();

  feed
    .create({
      userId: user._id,
      createData: requestDate,
      title: title,
      description: description,
      images: images,
      labels: labels,
    })
    .then(result => {
      res.send({
        message: 'success',
        debug: result,
      });
    })
    .catch(error => {
      res.send({
        message: 'fail',
        debug: error,
      });
    });
});

router.get('/getAllPosts', (req, res) => {
  const user = req['user'];

  feed
    .find({})
    .then(result => {
      res.send({
        message: 'success',
        result: result,
      });
    })
    .catch(error => {
      res.send({
        message: 'fail',
        debug: error,
      });
    });
});

router.get('/getMyPosts', (req, res) => {
  const user = req['user'];

  feed
    .find({
      userId: user._id,
    })
    .then(result => {
      res.send({
        message: 'success',
        result: result,
      });
    })
    .catch(error => {
      res.send({
        message: 'fail',
        debug: error,
      });
    });
});

router.delete('/deletePost', (req, res) => {
  const user = req['user'];

  feed
    .deleteOne({
      // userId: user._id,
      //todo => get id
    })
    .then(result => {
      res.send({
        message: 'success',
        result: result,
      });
    })
    .catch(error => {
      res.send({
        message: 'fail',
        debug: error,
      });
    });
});

export default router;
