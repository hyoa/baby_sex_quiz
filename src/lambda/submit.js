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
  const birthDateTime = Date.parse(data.birthDate)

  if (
    !answerFromEmail &&
    (data.name && data.name.trim() !== '') &&
    (data.weight && !isNaN(parseInt(data.weight)) && data.weight <= 6000 && data.weight >= 1000) &&
    (data.length && !isNaN(parseInt(data.length)) && data.length >= 10 && data.length < 100) &&
    (data.birthDate && data.birthDate.trim() !== '' && birthDateTime <= 1570665600000 && birthDateTime >= 1562716800000) &&
    (data.sex && (data.sex === 'm' || data.sex === 'f'))
  ) {
    data.name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

    const answer = new AnswerModel(data)
    await answer.save()
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true })
  }
}
