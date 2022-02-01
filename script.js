const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let currentActiveCard = 0;

const cardEl = [];

const cardData = getCardData();

// const cardData = [{
//         question: "What must a variable begin with?",
//         answer: "A letter, $ or _"
//     },
//     {
//         question: "What is a variable?",
//         answer: "Container for piece of data"
//     },
//     {
//         question: "Example of Case Sensetive Variable",
//         answer: "thisIsAVariable"
//     }
// ]

function createCards() {
    cardData.forEach((data, index) => {
        createCard(data, index);
    })
}

function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    if (index === 0) {
        card.classList.add("active");
    }
    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;
    card.addEventListener("click", () => card.classList.toggle("show-answer"));
    cardEl.push(card);
    console.log(cardEl);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardEl.length}`
}

function getCardData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? [] : cards;
}

function setCardsData(cardData) {
    localStorage.setItem("cards", JSON.stringify(cardData));
    window.location.reload();
}

createCards();

nextBtn.addEventListener("click", () => {
    cardEl[currentActiveCard].className = "card left";
    currentActiveCard += 1;
    if (currentActiveCard > cardEl.length - 1) {
        currentActiveCard = cardEl.length - 1;
    }
    cardEl[currentActiveCard].className = "card active";
    updateCurrentText();
});

prevBtn.addEventListener("click", () => {
    cardEl[currentActiveCard].className = "card right";
    currentActiveCard -= 1;
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cardEl[currentActiveCard].className = "card active";
    updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
addCardBtn.addEventListener("click", () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        const newCard = {question, answer};
        createCard(newCard);
        questionEl.value = "";
        answerEl.value = "";
        addContainer.classList.remove("show");
        cardData.push(newCard);
        setCardsData(cardData);
    }
});
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
})