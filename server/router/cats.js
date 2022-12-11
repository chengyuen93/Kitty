import { Router } from 'express';
import { getBreeds, getCat, getCatsByBreed } from '../services/cats.js';

const router = Router();

router.get('/cat', getCat);
router.get('/cats/:id', getCatsByBreed);
router.get('/breeds', getBreeds);

export default router;
