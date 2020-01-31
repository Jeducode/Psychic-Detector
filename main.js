// Player name and Game
let gameLev = "";
let name = "";

// Modal Trigger
let modalInstance;
function modalTrigger() {
  var elems = document.querySelectorAll(".modal");
  modalInstance = M.Modal.init(elems, {
    onOpenEnd: initCarouselModal,
    dismissible: false
  });
}

// Sliders in Modal function
let sliderInstance;
function initCarouselModal() {
  var elems = document.querySelector("#one");
  sliderInstance = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true
  });
}

// Previous and Next Button

// Previous
document.querySelector(".prev-slide").addEventListener("click", function() {
  sliderInstance.prev();
});

// Next
document.querySelector(".next-slide").addEventListener("click", function() {
  sliderInstance.next();
});

// Player Detials Class constructor
class PlayerDetials {
  constructor(name, gameLevel) {
    this.name = name;
    this.gameLevel = gameLevel;
  }
}

// Set Player Name and Level
let welcomePhrase;
let gameLevPhrase;

// Flip Class
class Flips {
  // Recieves Player details from the get Player Details Function below
  setFlips(player) {
    gameLev = player.gameLevel;
    name = player.name;

    // Create the Dynamic Welcome Phrase with Name
    welcomePhrase = document.createElement("h3");
    let innerh2 = document.getElementById("slider1-inner");
    welcomePhrase.id = "slider-pyschic-name";
    welcomePhrase.appendChild(document.createTextNode(`Hello ${name}`));
    document.getElementById("slider-1").insertBefore(welcomePhrase, innerh2);

    // Create Dynamic Difficulty Level Phrase
    gameLevPhrase = document.createElement("h2");
    let innergameLevPhrase = document.getElementById("inner-game-lev");
    gameLevPhrase.id = "slider-player-level";
    gameLevPhrase.appendChild(
      document.createTextNode(
        `The Difficulty level you chose is  ${gameLev.toUpperCase()}`
      )
    );
    document
      .getElementById("slider-2")
      .insertBefore(gameLevPhrase, innergameLevPhrase);

    modalTrigger();
  }
}

// Form Event Listener
document
  .querySelector("#form-submit")
  .addEventListener("click", getPlayerDetials);

function getPlayerDetials(e) {
  //  Get Player Details function
  if (document.getElementById("name").value != "") {
    let name = document.getElementById("name").value,
      chooseLevel = document.getElementsByName("game");
    let gameLevel;
    for (var i = 0, length = chooseLevel.length; i < length; i++) {
      if (chooseLevel[i].checked) {
        gameLevel = chooseLevel[i].value;
      }
    }

    //   Instantiate a New Player Details
    const player = new PlayerDetials(name, gameLevel);

    // Instatiate Flip class and Pass Player details into the prototype
    const flip = new Flips();
    flip.setFlips(player);
  } else {
    alert("Please, Enter a name");
  }

  e.preventDefault();
}

// Modal Continue and Cancel Event Listener

// Cancel Modal
document.querySelector("#cancel-modal").addEventListener("click", function(e) {
  name = "";
  document.getElementById("name").value = "";
  document.getElementById("slider-pyschic-name").remove();
  document.getElementById("slider-player-level").remove();
  e.preventDefault;
});

// Continue Modal
document.querySelector("#continue-modal").addEventListener("click", function() {
  document.getElementById("section-one").style.display = "none";
  document.querySelector(".flip-container").style.display = "block";
  showQuestion();
});

// Creare a randomly sorted and shuffled Questions Array
let sortedQuizes = questions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;

// Append Quiz TItle
// Question Container
let questionContainer = document.querySelector("#quiz-questions");

function showQuestion() {
  let cardId = 1;
  let card2Id = 1;
  // Each Question from the Question array.
  let quizQuestion = sortedQuizes[currentQuestionIndex];

  // Check Game Difficulty to Determine number of Options
  let optionsLength = [];
  if (gameLev === "easy") {
    for (let i = 0; i < 3; i++) {
      optionsLength.push(quizQuestion.answers[i]);
    }
  } else if (gameLev === "medium") {
    for (let j = 0; j < 4; j++) {
      optionsLength.push(quizQuestion.answers[j]);
    }
  } else {
    for (let k = 0; k < 6; k++) {
      optionsLength.push(quizQuestion.answers[k]);
    }
  }
  // Randomly Shuffled answer options
  let shuffledQuizAnswers = optionsLength.sort(() => Math.random() - 0.5);

  document.querySelector(".game-question").innerText = quizQuestion.question;

  shuffledQuizAnswers.forEach(answer => {
    // Create all Card Elements
    let outerCardCon = document.createElement("div");
    let innerCardCon = document.createElement("div");
    let imgCard1 = document.createElement("div");
    let imgCard2 = document.createElement("div");
    let cardImg1 = document.createElement("img");
    let cardImg2 = document.createElement("img");

    // Add Classes to Cards
    outerCardCon.className = "col s12 m4 outer-card-container";
    innerCardCon.className = "card white inner-card-container";
    imgCard1.className = "card-front card-select";
    if (answer.correct) {
      imgCard2.className = "card-back card-select2 green";
    } else {
      imgCard2.className = "card-back card-select2 red";
    }
    imgCard1.id = "img1-five-" + cardId++;
    imgCard2.id = "img2-five-" + card2Id++;
    cardImg1.src = "img/card-cover.svg";
    cardImg2.src = answer.img;

    // Append Cards
    imgCard1.appendChild(cardImg1);
    imgCard2.appendChild(cardImg2);
    innerCardCon.appendChild(imgCard1);
    innerCardCon.appendChild(imgCard2);
    outerCardCon.appendChild(innerCardCon);

    questionContainer.appendChild(outerCardCon);
  });
}

// Initial Game Score counter
let gameLeftNum = 10;
let GameLeft = document.getElementById("game-left");
GameLeft.innerText = gameLeftNum;
let correctGuessNum = 0;
let CorrectNum = document.getElementById("correct-guesses");
CorrectNum.innerText = correctGuessNum;
let wrongGuessNum = 0;
let initialWrongNum = document.getElementById("wrong-guesses");
initialWrongNum.innerText = wrongGuessNum;

// Card Select Handler
document.body.addEventListener("click", openCard);
document.body.addEventListener("click", closeCard);

// Open Cards and Update Counter
function openCard(e) {
  if (e.target.parentElement.className === "card-front card-select") {
    cardClosing(e);
    e.target.parentElement.parentElement.classList.add("flip-card");
    let cardClass = e.target.parentElement.parentElement.children[1].className;
    gameLeftNum--;
    GameLeft.innerText = gameLeftNum;

    if (cardClass === "card-back card-select2 green") {
      correctGuessNum++;
      CorrectNum.innerText = correctGuessNum;
    } else {
      wrongGuessNum++;
      initialWrongNum.innerText = wrongGuessNum;
    }
    openCorrectCard(e);
    setTimeout(nextQuestion, 2000);
  }
}

// Show Result

// Show Result Function

function showResult() {
  document.querySelector(".flip-container").innerHTML = "";
  document.getElementById("show-result").style.display = "block";

  let resultText;

  // Easy Level Result Text
  if (gameLev === "easy" && correctGuessNum < 4) {
    resultText =
      "Wow! This is Embarasing. You really need to try again and see if you can have a better score .";
  } else if (
    gameLev === "easy" &&
    correctGuessNum >= 4 &&
    correctGuessNum <= 6
  ) {
    resultText =
      "Not so bad, but I think You were just Lucky. Play again if you are really sure you got some pyschic powers.";
  } else if (gameLev === "easy" && correctGuessNum > 6) {
    resultText =
      "Wow! This is amazing. But this is the easy Level. I'll believe you have Pyschic Powers If you try a more difficult Level. ";
  }

  // Medium Level Result Text
  if (gameLev === "medium" && correctGuessNum < 4) {
    resultText =
      "Oops. Don't worry. Take a deep breath. Try again, and this time, trust your guts.";
  } else if (
    gameLev === "medium" &&
    correctGuessNum >= 4 &&
    correctGuessNum <= 6
  ) {
    resultText =
      "This is an average Performance. I highly encourage you to try again and ensure you do better";
  } else if (gameLev === "medium" && correctGuessNum > 6) {
    resultText =
      "You should be Proud of Yourself. But don't be to confident until you try the difficult level and succeed. ";
  }

  // Difficult Level Result Text
  if (gameLev === "Difficult" && correctGuessNum < 4) {
    resultText =
      "It seems you've got no Psychic Powers at all. Or were you stressed out? Try again or choose an easier level.";
  } else if (
    gameLev === "Difficult" &&
    correctGuessNum >= 4 &&
    correctGuessNum <= 6
  ) {
    resultText =
      "Very Impresssive, I admit. But this is not the best of you. Try again and prove to me that you are a Ninja Psychic";
  } else if (gameLev === "Difficult" && correctGuessNum > 6) {
    resultText =
      "This is unbelievable! Surely I know psychics exist and I just found one. You are amazing. ";
  }

  document.getElementById(
    "result-name"
  ).innerHTML = `${name}, You just played the ${gameLev.toUpperCase()} Game Level`;
  document.getElementById(
    "result-score"
  ).innerHTML = `You had ${correctGuessNum} Hits and ${wrongGuessNum} Misses`;

  document.getElementById("result-text").innerHTML = resultText;
}

// Open Correct Card
function openCorrectCard(e) {
  let addClass = Array.from(
    e.target.parentElement.parentElement.parentElement.parentElement.children
  );
  addClass.forEach(card => {
    if (
      card.firstElementChild.lastElementChild.className ===
      "card-back card-select2 green"
    ) {
      card.firstElementChild.classList.add("flip-card");
    }
  });
}

// Close Cards
function closeCard(e) {
  let backCardClassName = e.target.parentElement.className;
  if (
    backCardClassName === "card-back card-select2 red" ||
    backCardClassName === "card-back card-select2 green"
  ) {
    cardClosing(e);
  }
}

// Close Card Function
function cardClosing(e) {
  e.target.parentElement.parentElement.classList.remove("flip-card");

  let removeClass = Array.from(
    e.target.parentElement.parentElement.parentElement.parentElement.children
  );

  removeClass.forEach(card => {
    card.children[0].classList.remove("flip-card");
    card.children[0].classList.add("disable-pointer");
  });
}

// Call Next Game
function nextQuestion() {
  if (sortedQuizes.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    clearCurrentQuestion();
    showQuestion();
  } else {
    showResult();
  }
}

// Clear Current Question
function clearCurrentQuestion() {
  questionContainer.innerHTML = "";
}

// Reload Game at the end of the Game
document.getElementById("try-again").addEventListener("click", () => {
  location.reload();
});
