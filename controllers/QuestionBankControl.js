const QuestionBankModel = require('../Models/QuestionBankModel')
const {QuestionAddJoi ,QuestionEditJoi ,QuestionSortJoi} = require('../Schema/QuestionBankJoi')
const {default : mongoose} = require('mongoose')
const {serverError , joiError ,mongooseIdError,successMessage,multipleAnswerCheck} = require('../Utils/commonFuncs')


module.exports.addQuestion = async(req,res) => {
    try{
        //get data from req body
        const{subject,module,question,options,answer,level,value} = await QuestionAddJoi.validateAsync(req.body,{abortEarly:false})

        isAnswerMultiple=multipleAnswerCheck(answer)

        const Question = new QuestionBankModel({subject,module,question,options,answer,isAnswerMultiple,level,value});
        
        //create new question 
        await Question.save();

        successMessage(res);
    }
    catch(error){
        if(joiError(res,error)){
            return;
        }
        serverError(res,error)
    }
}

module.exports.editQuestion = async (req,res) => {
    try{
        //id comes as a parameter in the query string 
        const{id}  = req.params;

        //joi check of data 
        const{subject,module,question,options,answer,level,value} = await QuestionEditJoi.validateAsync(req.body,{abortEarly:false})
        // check if valid id
        mongooseIdError(id,res)

        isAnswerMultiple=multipleAnswerCheck(answer)
        
        //update the question
        const NewQuestion = await QuestionBankModel.findByIdAndUpdate(id,{subject,module,question,options,answer,isAnswerMultiple,level,value},{new:true})
        
        if (NewQuestion === null){
            return res.status(404).json({
                message:`Question with id ${id} not found`
            })
        }

        successMessage(res);
    }
    catch(error){
        if(joiError(res,error)){
            return
        }
        serverError(res,error)
    }
}

module.exports.deleteQuestion = async(req,res) =>{
    try{
        const {id} = req.params
    
        // check if valid id
        mongooseIdError(id,res)
    
        //delete a question
        const deletedQuestion = await QuestionBankModel.findByIdAndDelete(id)
    
        if (deletedQuestion === null){
            return res.status(404).json({
                message:`Question with id ${id} not found`
            })
        }
    
        successMessage(res);
    }
    catch(error){
        serverError(res,error);
    }
}

module.exports.getQuestions = async(req,res) => {
    try{
        //parameters to filter by are obtained 
        const filter = await QuestionSortJoi.validateAsync(req.body,{abortEarly:false})

        //parameters used to obtain the question list 
        const questions = await QuestionBankModel.find(filter)

        if (questions.length===0){
            return res.status(404).json({
                message:`No questions for parameters found`
            })
        }
        
        res.status(200).json(questions)
    }
    catch(error){
        if(joiError(res,error)){
            return
        }
        serverError(res,error)
    }
}