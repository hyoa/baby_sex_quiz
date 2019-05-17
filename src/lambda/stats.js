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

exports.handler = async function (event, context) {
  const result = await AnswerModel.aggregate([
    {
      '$facet': {
        sex: [ { $group: { _id: '$sex', number: { $sum: 1 } } } ],
        name: [ { $group: { _id: '$name', number: { $sum: 1 } } } ],
        weight: [ { $group: { _id: '$weight', number: { $sum: 1 } } } ],
        length: [ { $group: { _id: '$length', number: { $sum: 1 } } } ],
        birthDate: [ { $group: { _id: '$birthDate', number: { $sum: 1 } } } ]
      }
    }
  ])

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  }
}
