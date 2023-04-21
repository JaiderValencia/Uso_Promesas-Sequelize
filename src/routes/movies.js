const express = require('express');
const addValidations = require('../middlewares/addValidations');

const moviesController = require('../controllers/moviesController');

const router = express.Router();

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);
router.get('/add', moviesController.add);
router.post('/create', addValidations.arrayValidations, moviesController.create);
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id', moviesController.update);
router.delete("/delete/:id", moviesController.delete);
router.get("/list", moviesController.listWithGenres);

module.exports = router;