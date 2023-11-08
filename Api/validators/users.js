const { check, validationResult } = require('express-validator');


const validateRegister = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({
            min: 4,
            max: 90
        }),
    check("lastName")
        .exists()
        .notEmpty()
        .isLength({
            min: 4,
            max: 90
        }),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({
            min: 6,
            max: 24
        }),
    check("address"),
    check("phone")
        .isLength({
            max: 9
        }),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            return res.status(403).json({
                error: "Error entrada de datos invalida."
            })
        }
    }
]

const validateLogin = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({
            min: 6,
            max: 24
        }),
        (req, res, next) => {
            try {
                validationResult(req).throw()
                return next()
            } catch (error) {
                res.status(403)
                res.send({
                    errors: err.array()
                })
            }
        }
]

module.exports = { validateRegister , validateLogin};