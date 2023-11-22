// How to get quotes: api.quotable.io/random
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let correct = true;

let roundTime;
function getTimerTime() {
    return Math.floor((new Date() + roundTime) / 1000);
}

function startTimer() {
    timerElement.innerText = 0;
    roundTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, -1000)
}

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
    startTimer();
}


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
            } else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                correct = false;
            }


        })

        if (correct) renderNewQuote();
    });
    renderNewQuote()
}







