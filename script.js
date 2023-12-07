/* 

E: Element 
CC: CharacterCounter

- CPS'nin (totalCorrectCharacter / totalTime) olması lazım.
- Correct character counter her zaman totali göstermeli.
*/

// How to get quotes: api.quotable.io/random
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayE = document.getElementById('quoteDisplay');
const quoteInputE = document.getElementById('quoteInput');


const timerE = document.getElementById('timer');
const timeSelectionE = document.getElementById('timeSelection');
const submitTimeSelectionButton = document.getElementById('submitTimeSelection');
const quoteCounterE = document.getElementById('quoteCounterElement');
const correctCCE = document.getElementById('correctCharacterCounterElement');
const incorrectCCE = document.getElementById('incorrectCharacterCounterElement');
const characterPerSecondE = document.getElementById('characterPerSecondElement');
const lastRoundSpeedElement = document.getElementById('lastRoundSpeedElement');

const lastRoundSpeed = document.getElementById('lastRoundSpeed');

lastRoundSpeedElement.classList.add('d-none');


let debounceTimer;
let correctCC = 0;
let incorrectCC = 0;
let characterPerSecond = 0;

submitTimeSelectionButton.addEventListener('click', () => {
    const selectedTimeStart = timeSelectionE.value;
    let selectedTime = timeSelectionE.value;
    timerE.innerText = selectedTime;
    quoteInputE.disabled = false;

    intervalId = setInterval(() => {
        timerE.innerText = selectedTime--;
        correctCCE.innerText = correctCC;
        incorrectCCE.innerText = incorrectCC;
        characterPerSecond = (correctCC / (selectedTimeStart - selectedTime)); // Adjusted formula
        characterPerSecondE.innerText = characterPerSecond.toFixed(2); // Format to two decimal places
        if (selectedTime == 0) {
            lastRoundSpeedElement.classList.remove('d-none');
            clearInterval(intervalId);
            quoteInputE.disabled = true;
            timerE.innerText = "Time is up!";
        }
    }, 1000);
    startRound();
});


function startRound() {
    quoteInputE.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const arrayQuote = quoteDisplayE.querySelectorAll('span');
            const arrayValue = quoteInputE.value.split('');
            dewam = true;
            correctCC = 0; // Reset counters on each input
            incorrectCC = 0;
            tps = 0;

            arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index];

                if (character == null) {
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.remove('incorrect');
                    dewam = false;
                } else if (character === characterSpan.innerText) {
                    correctCC += 1;
                    characterSpan.classList.add('correct');
                    characterSpan.classList.remove('incorrect');
                } else {
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.add('incorrect');
                    incorrectCC += 1;
                    dewam = false;
                }
            });
            if (dewam) renderNewQuote();
        }, 1); // Adjust the debounce time as needed
    });

    renderNewQuote();
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
    quoteDisplayE.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayE.appendChild(characterSpan);
    })
    quoteInputE.value = null;
}




// Doğru yapılan quote'ları kaydet
// En sonda bir analiz göster




/* 

OLD:
let newQuoteCounter = 0;
let correctCharacterCounter = 0;
let incorrectCharacterCounter = 0;


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
                correctCharacterCounter += 1;
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');

            } else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                incorrectCharacterCounter += 1;
                correct = false;
            }
        });

        if (correct) renderNewQuote();
    });

    renderNewQuote();

}

*/