(function() {
  const myQuestions = [
    {
      question: "What nutrient can you get only from whole fruits?",
      answers: {
        a: "potassium",
        b: "vitamin C",
        c: "fiber"
      },
      correctAnswer: "c"
    },
    {
      question: "What kind of vegetable is spinach?",
      answers: {
        a: "starchy vegetable",
        b: "dark-green vegetable",
        c: "beans and peas"
      },
      correctAnswer: "b"
    },
    {
      question:
        "What are important nutrients found in protein that vegetarians should make sure to get enough of?",
      answers: {
        a: "folic acid and vitamin A",
        b: "vitamin C and magnesium",
        c: "iron and vitamin B12"
      },
      correctAnswer: "c"
    },
    {
      question: "What kind of grain is oatmeal?",
      answers: {
        a: "refined grain",
        b: "whole grain",
        c: "enriched grain"
      },
      correctAnswer: "b"
    },
    {
      question:
        "What is the most important nutrient that dairy products contain?",
      answers: {
        a: "calcium",
        b: "magnesium",
        c: "lactose"
      },
      correctAnswer: "a"
    },
    {
      question: "What disease can eating nuts help to prevent?",
      answers: {
        a: "cancer",
        b: "diabetes",
        c: "heart disease"
      },

      correctAnswer: "c"
    },
    {
      question:
        "What is the vitamin in fruit that's needed by cells for growth?",
      answers: {
        a: "vitamin C",
        b: "folate",
        c: "vitamin K"
      },
      correctAnswer: "b"
    },
    {
      question:
        "What is the healthy omega-3 fatty acid that seafood contains called?",
      answers: {
        a: "EPA",
        b: "DHA",
        c: "all of the above"
      },
      correctAnswer: "c"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (var letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
