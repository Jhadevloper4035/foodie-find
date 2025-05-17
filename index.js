const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());
app.use(cors());

let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllRestaurant() {
  let query = 'SELECT * FROM restaurants ';
  let results = await db.all(query, []);
  return { restaurants: results };
}

app.get('/restaurants', async (req, res) => {
  try {
    const results = await fetchAllRestaurant();

    if (results.restaurants.length === 0)
      return res.status(404).json({ message: 'No restaurants found ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function fetchRestaurantById(id) {
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let results = await db.all(query, [id]);
  return { restaurant: results };
}

app.get('/restaurants/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await fetchRestaurantById(id);

    if (results.restaurants.length === 0)
      return res
        .status(404)
        .json({ message: 'No restaurants found by this id  ' + id });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function fetchRestaurantByCusine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let reuslts = await db.all(query, cuisine);
  return { restaurants: reuslts };
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const results = await fetchRestaurantByCusine(cuisine);

    if (results.restaurants.length === 0)
      return res
        .status(404)
        .json({ message: 'No restaurants found by this cusine' + cusine });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function restaurantFilterBycat(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND  hasOutdoorSeating = ? AND isLuxury = ? ';
  let results = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: results };
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    const isVeg = req.query.isVeg;
    const hasOutdoorSeating = req.query.hasOutdoorSeating;
    const isLuxury = req.query.isLuxury;

    console.log(isVeg, hasOutdoorSeating, isLuxury);

    const results = await restaurantFilterBycat(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );

    if (results.restaurants.length === 0)
      return res.status(404).json({ message: 'No restaurants found by ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function sortRestaurantByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let results = await db.all(query, []);
  return { restaurants: results };
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    const results = await sortRestaurantByRating();

    if (results.restaurants.length === 0)
      return res.status(404).json({ message: 'No restaurants found by ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let results = await db.all(query, []);
  return { dishes: results };
}

app.get('/dishes', async (req, res) => {
  try {
    const results = await fetchAllDishes();

    if (results.dishes.length === 0)
      return res.status(404).json({ message: 'No dishes found by ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function fetchAllDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id = ? ';
  let result = await db.all(query, [id]);
  return { dish: result };
}

app.get('/dishes/details/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const results = await fetchAllDishesById(id);

    if (results.dish.length === 0)
      return res
        .status(404)
        .json({ message: 'No dishes found by this id  ' + id });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function fetchAllDishesByIsVeg(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg = ?';
  let results = await db.all(query, [isVeg]);
  return { dishes: results };
}

app.get('/dishes/filter', async (req, res) => {
  try {
    const isVeg = req.query.isVeg;
    const results = await fetchAllDishesByIsVeg(isVeg);

    if (results.dishes.length === 0)
      return res.status(404).json({ message: 'No dishes found  ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

async function sortlDishesByRating() {
  let query = 'SELECT * FROM dishes ORDER BY rating';
  let results = await db.all(query, []);
  return { dishes: results };
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    const results = await sortlDishesByRating();

    if (results.dishes.length === 0)
      return res.status(404).json({ message: 'No dishes found  ' });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/" , (res,res) => {
  res.re
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
