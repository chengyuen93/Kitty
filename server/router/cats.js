import { Router } from 'express';
import { getCat } from '../services/cats.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.send('Hi cats');
});

router.get('/cat', getCat);
// router.get('/cat/:id', getCat);

export default router;
