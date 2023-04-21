const db = require('../database/models');


const genresController = {
    list: async (req, res) => {
        const genres = await db.Genre.findAll();
        res.render('genresList', { genres });
    },
    detail: async (req, res) => {
        const genre = await db.Genre.findByPk(req.params.id);
        res.render('genresDetail', { genre });
    },
    genresWithMovies: async (req, res) => {
        try {
            const genres = await db.Genre.findAll({ include: "movies" });

            res.send(genres);
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = genresController;