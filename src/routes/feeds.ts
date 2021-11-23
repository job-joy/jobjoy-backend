import express from 'express';

import { feed } from '../models/feed';

var router = express.Router();

router.post('/createPost', async (req, res) => {
  const { title, description, images, labels } = req.body;

  res.send({
    message: 'create post',
    user: req['user'],
  });
});

export default router;
