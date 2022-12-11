import Axios from '../utils/axios.js';

export const getCat = async (req, res, next) => {
  const { id } = req.params;
  const has_breeds = Math.random() > 0.5 ? 1 : 0;
  try {
    if (id) {
    } else {
      const { data } = await Axios.get(
        `/images/search?has_breeds=${has_breeds}`
      );
      res.status(200).json({
        ...data
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};
