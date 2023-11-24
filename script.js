// How to get quotes: api.quotable.io/random
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');

const timerElement = document.getElementById('timer');
const timeSelectionElement = document.getElementById('timeSelection');
const submitTimeSelectionButton = document.getElementById('submitTimeSelection');
const quoteCounterElement = document.getElementById('quoteCounterElement');
const correctCharacterCounterElement = document.getElementById('correctCharacterCounterElement');
const incorrectCharacterCounterElement = document.getElementById('incorrectCharacterCounterElement');

let newQuoteCounter;
let correctCharacterCounter;
let incorrectCharacterCounter;


correct = true;
function startRound() {
    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span')
        const arrayValue = quoteInputElement.value.split('');
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index];
            if (character == null) {
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
                correct = false;
            }
            else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
                correctCharacterCounter += 1;
            } else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                incorrectCharacterCounter += 1;
                correct = false;
            }


        })

        if (correct) {
            newQuoteCounter = 0;
            renderNewQuote();
            newQuoteCounter += 1;
        }
    });
    renderNewQuote()
}

submitTimeSelectionButton.addEventListener('click', () => {
    let selectedTime = timeSelectionElement.value;
    timerElement.innerText = selectedTime;

    intervalId = setInterval(() => {
        timerElement.innerText = selectedTime--;
        if (selectedTime == 0) {
            clearInterval(intervalId);
            quoteInputElement.disabled = true;
            timerElement.innerText = "Time is up!";
            quoteCounterElement.innerText = newQuoteCounter;
            correctCharacterCounterElement.innerText = correctCharacterCounter;
            incorrectCharacterCounterElement.innerText = incorrectCharacterCounter;
        }
    }, 1000);
    startRound();
});

function getRandomQuote() {
    let content = fetch(RANDOM_QUOTE_API_URL)
        // Take response and return response.json() - json format of the response
        .then(response => response.json())
        // Take data and return data.content
        .then(data => data.content)
    return content;
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
}




// Doğru yapılan quote'ları kaydet
// En sonda bir analiz göster




