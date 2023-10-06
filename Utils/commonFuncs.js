const mongoose = require('mongoose')

function serverError(res,error){
    res.status(500).json({
        message: 'Something went wrong'
    })
    console.log(error)
    return;
};

function joiError(res,error){
    const { details } = error
        if (details) {
            let errorArray=[];
            for (errMsg of details) {
                errorArray.push(errMsg.message);
            }
            return res.status(400).json({
                errorArray});
    }
}

function mongooseIdError(id,res){
if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
        message: 'Invalid ObjectId'
    })
}}

function successMessage(res){
    return res.status(200).json({
        message : "ok"
    })
}

function multipleAnswerCheck(answer,isAnswerMultiple){
    if(answer.length>1){
        return true
    }
    else{
        return false
    }
}


module.exports = {serverError,joiError,mongooseIdError,successMessage,multipleAnswerCheck};