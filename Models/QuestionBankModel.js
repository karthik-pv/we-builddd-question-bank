const mongoose = require('mongoose')

const QuestionBankSchema = new mongoose.Schema({
    subject : {
        type: String
    },

    module : {
        type : Number
    },

    question : {
        type : String
    },

    options : {
        type : Array
    },

    answer : {
        type : Array
    },

    isAnswerMultiple : {
        type : Boolean,
    },

    level : {
        type : Number
    }, 

    value : {
        type : Number
    }
})

const QuestionBankModel = mongoose.model('QuestionBank' , QuestionBankSchema);

module.exports = QuestionBankModel;