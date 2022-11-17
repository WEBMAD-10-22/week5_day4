const RestaurantModel = require('../models/restaurant.model');

const router = require('express').Router();

// ---- GET ----

/**
 * View all restaurants
 */
router.get('/', (req, res) => {
  RestaurantModel.find()
    .then((restaurants) => {
      res.json(restaurants);
    })
    .catch((err) => next(err));
});

/**
 * Create Restaurant
 */
router.get('/new', (req, res) => {
  res.render('restaurants/create');
});

/**
 * View one restaurant
 */
router.get('/:id', () => {});

/**
 * View update restaurant
 */
router.get('/edit/:id', (req, res, next) => {

});

/**
 * Delete restaurant
 */
router.get('/delete/:id', () => {});

// ---- POST ----

/**
 * Create restaurant
 * @body
 *
 */
router.post('/', (req, res, next) => {
  const { name, description, lat, lng } = req.body;

  const restaurant = {
    name,
    description,
    location: {
      type: 'Point',
      coordinates: [lng, lat],
    },
  };

  RestaurantModel.create(restaurant)
    .then(() => res.redirect('/restaurants'))
    .catch((err) => next(err));
});

/**
 * Edit restaurant
 * @body
 *
 */
router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description, lat, lng } = req.body;

  RestaurantModel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      'location.coordinate': [lng, lat],
    },
    { new: true }
  )
    .then((restaurant) => {
      res.json(restaurant);
    })
    .catch(next);
});

module.exports = router;
