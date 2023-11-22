// How to get quotes: api.quotable.io/random
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        // Take response and return response.json() - json format of the response
        .then(response => response.json())
        // Take data and return data.content
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    console.log(quote);
}

getNextQuote()