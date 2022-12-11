import Axios from '../utils/axios.js';

export const getCat = async (req, res, next) => {
  // 1 - get cats with breeds
  // 0 - get cats without breeds
  // randomising this so that we can get either
  const has_breeds = Math.random() > 0.5 ? 1 : 0;
  try {
    const { data } = await Axios.get(`/images/search?has_breeds=${has_breeds}`);
    res.status(200).json({
      ...data
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

export const getBreeds = async (req, res, next) => {
  try {
    const { data } = await Axios.get(`/breeds`);
    res.status(200).json({
      ...data
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

export const getCatsByBreed = async (req, res, next) => {
  const { id } = req.params;
  const { limit = 6 } = req.query;
  try {
    const { data } = await Axios.get(
      `/images/search?breed_ids=${id}${
        limit === undefined ? '' : `&limit=${limit}`
      }`
    );
    res.status(200).json({
      ...data
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};
