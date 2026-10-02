import { body, validationResult } from "express-validator"

export const registerValidator = [
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min:2, max:30 }).withMessage("Name length must be between 2 and 30 characters"),
    body("age")
        .trim()
        .exists().withMessage("Age is required").bail()
        .isInt({ min:1, max:100 }).withMessage("Irrelvant age"),
    body("phoneNumber")
        .trim()
        .matches(/^[6-9]\d{9}$/).withMessage("Please enter a valid Indian phone number"),
    body("password")
        .trim()
        .exists().withMessage("Password is required").bail()
        .isLength({ min:6 }).withMessage("Password length must be at least 6 character long"),
    
    (req, res, next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next()

    }
]

export const loginValidator = [

    body("phoneNumber")
        .trim()
        .matches(/^[6-9]\d{9}$/).withMessage("Please enter a valid Indian phone number"),
    body("password")
        .trim()
        .exists().withMessage("Password not found"),
    
    (req, res, next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next()

    }
]