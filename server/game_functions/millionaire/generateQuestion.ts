import questions from '../../data/millionaire/questions'

export default function generateQuestion() {
  let question = questions[Math.round(Math.random() * (questions.length - 1))]
  // let answers = []
  // answers.push(question.correct, question.incorrect1, question.incorrect2, question.incorrect3)
  // let randomizedAnswers = answers.sort(() => Math.random() - 0.5)
  // let newQuestion: [string, any[]]
  // newQuestion.push(question.question, randomizedAnswers)
  // return newQuestion
  return question
}