const express = require('express')
const router = express.Router()
const {addQuestion,editQuestion,deleteQuestion,getQuestions} = require('../controllers/QuestionBankControl')

//console.log(addQuestion,editQuestion,deleteQuestion,getQuestions);

router.post('/add',addQuestion)
router.patch('/edit:id',editQuestion)
router.delete('/remove:id',deleteQuestion)
router.post('/questions',getQuestions)

module.exports = router;

