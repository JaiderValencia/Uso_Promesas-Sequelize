const { body } = require('express-validator');

module.exports = {
    arrayValidations: [
        body('title').notEmpty().withMessage('No puede estar esto vacío').bail(),
        body('rating').notEmpty().withMessage('No puede estar esto vacío').bail()
            .isInt().withMessage("Tiene que ser un entero"),
        body('awards').notEmpty().withMessage('No puede estar esto vacío')
            .isInt().withMessage("Tiene que ser un entero"),
        body('release_date').notEmpty().withMessage('No puede estar esto vacío').bail()
            .isDate().withMessage("Tiene que ser una fecha"),
        body('length').notEmpty().withMessage('No puede estar esto vacío'),
    ]
}