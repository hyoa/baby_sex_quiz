const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
const AnswerModel = mongoose.model('Answer', {
  name: String,
  weight: Number,
  length: Number,
  birthDate: String,
  sex: String,
  email: String
})

exports.handler = async function ({ body }, context, callback) {
  const data = JSON.parse(body)
  const answerFromEmail = await AnswerModel.findOne({ email: data.email })

  if (
    !answerFromEmail &&
    (data.name && data.name.trim() !== '') &&
    (data.weight && !isNaN(parseInt(data.weight))) &&
    (data.length && !isNaN(parseInt(data.length))) &&
    (data.birthDate && data.birthDate.trim() !== '') &&
    (data.sex && (data.sex === 'm' || data.sex === 'f'))
  ) {
    const answer = new AnswerModel(data)
    await answer.save()
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true })
  }
}
