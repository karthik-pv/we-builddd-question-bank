const Joi = require('joi')

const QuestionAddJoi = Joi.object({

    subject : Joi.string().required(),

    module : Joi.number().min(1).max(5).required(),

    question : Joi.string().required(),

    options : Joi.array().required() , 

    answer : Joi.array().required(), 

    isAnswerMultiple : Joi.boolean().required(),

    level : Joi.number().min(1).max(3).required(),

    value : Joi.number().required()

})

const QuestionEditJoi = Joi.object({

    subject : Joi.string(),

    module : Joi.number().min(1).max(5),

    question : Joi.string(),

    options : Joi.array(), 

    answer : Joi.array(), 

    isAnswerMultiple : Joi.boolean(),

    level : Joi.number().min(1).max(3),

    value : Joi.number()

})

const QuestionSortJoi = Joi.object({

    subject : Joi.string(),

    module : Joi.array().items(Joi.number().min(1).max(5)),

    isAnswerMultiple : Joi.boolean(),

    level : Joi.array().items(Joi.number().min(1).max(3)),

    value : Joi.number()

})

module.exports = {QuestionAddJoi , QuestionEditJoi , QuestionSortJoi}