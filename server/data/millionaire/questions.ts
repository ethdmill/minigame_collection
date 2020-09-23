interface Answer {
  text: string,
  isCorrect: boolean
}

interface Question {
  prompt: string,
  pointValue: number,
  answers: Answer[]
}

const questions: Question[] = [
  {
    'prompt': 'What tool do you use to hammer a nail? (TEST QUESTION)',
    'pointValue': 1,
    'answers': [
      {
        'text': 'A hammer',
        'isCorrect': true
      },
      {
        'text': 'A nail',
        'isCorrect': false
      },
      {
        'text': 'A third option not mentioned in the show',
        'isCorrect': false
      },
      {
        'text': 'These strings are longer than they should be',
        'isCorrect': false
      }
    ]
  }, 
]

export default questions

// default question template
// {
//   'prompt': '',
//   'pointValue': 0,
//   'answers': [
//     {
//       'text': '',
//       isCorrect: true
//     },
//     {
//       'text': '',
//       isCorrect: false
//     },
//     {
//       'text': '',
//       isCorrect: false
//     },
//     {
//       'text': '',
//       isCorrect: false
//     }
//   ]
// },