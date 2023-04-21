const db = require('../database/models');
const { validationResult } = require('express-validator');

const controller = {
    list: (req, res) => {
        db.Movie.findAll()
            .then((movies) => {
                res.render('moviesList', { movies });
            })
            .catch((err) => {
                res.send(err);
            });
    },
    detail: async (req, res) => {
        try {
            const movie = await db.Movie.findByPk(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Pelicula no encontrada' });
            }
            res.render('moviesDetail', { movie });
        } catch (error) {
            res.send(error);
        }
    },
    new: async (req, res) => {
        try {
            const movies = await db.Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            });
            res.render('newestMovies', { movies });
        } catch (error) {
            res.send(error);
        }
    },
    recomended: async (req, res) => {
        try {
            const movies = await db.Movie.findAll({
                where: {
                    rating: { [db.Sequelize.Op.gte]: 8 }
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            res.render('recommendedMovies.ejs', { movies });
        } catch (error) {
            res.send(error);
        }
    },
    add: (req, res) => {
        res.render("moviesAdd");
    },
    create: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render("moviesAdd", { errors: errors.mapped() })
            }

            const movieToPush = {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length
            };

            await db.Movie.create(movieToPush);

            res.redirect("/movies")
        } catch (error) {
            res.send(error)
        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id

            const movie = await db.Movie.findByPk(id)

            res.render("moviesEdit", { Movie: movie })
        } catch (error) {
            res.send(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const movieToUpdate = {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length
            }

            await db.Movie.update(movieToUpdate, { where: { id } });

            res.redirect(`/movies/detail/${id}`);
        } catch (error) {
            res.send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            await db.Movie.destroy({
                where: { id }
            })

            res.redirect("/movies");
        } catch (error) {
            res.send(eror)
        }
    },
    listWithGenres: async (req, res) => {
        try {
            const movies = await db.Movie.findAll({ include: ["genre", "actors"] });

            res.send(movies);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = controller;