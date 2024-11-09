const $startGameButton = document.querySelector(".start-jogo")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()

  if (questions.length == currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom!"
      break
    default:
      message = "Dá pra melhorar!!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
    {
      question: "Qual é o maior país do mundo em área?",
      answers: [
        { text: "Canadá", correct: false },
        { text: "China", correct: false },
        { text: "Estados Unidos", correct: false },
        { text: "Rússia", correct: true }
      ]
    },
    {
      question: "Em que ano o homem chegou à Lua pela primeira vez?",
      answers: [
        { text: "1969", correct: true },
        { text: "1959", correct: false },
        { text: "1972", correct: false },
        { text: "1980", correct: false }
      ]
    },
    {
      question: "Qual é a capital da Austrália?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Melbourne", correct: false },
        { text: "Canberra", correct: true },
        { text: "Adelaide", correct: false }
      ]
    },
    {
      question: "Em qual país está localizado o famoso Machu Picchu?",
      answers: [
        { text: "Peru", correct: true },
        { text: "Bolívia", correct: false },
        { text: "México", correct: false },
        { text: "Argentina", correct: false }
      ]
    },
    {
      question: "Qual é o oceano mais profundo do mundo?",
      answers: [
        { text: "Oceano Pacífico", correct: true },
        { text: "Oceano Atlântico", correct: false },
        { text: "Oceano Índico", correct: false },
        { text: "Oceano Ártico", correct: false }
      ]
    },
    {
      question: "Qual é o maior deserto do mundo?",
      answers: [
        { text: "Deserto de Gobi", correct: false },
        { text: "Deserto do Saara", correct: false },
        { text: "Deserto de Kalahari", correct: false },
        { text: "Deserto Antártico", correct: true }
      ]
    },
    {
      question: "Quantos continentes existem no planeta Terra?",
      answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false }
      ]
    }
];