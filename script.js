const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader =document.getElementById('loader');

let apiQuotes = []; // for global var and let is used as we'll change its value
//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    loading();

    // pick a random quote from api
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
    // check if author exists or not
    (!quote.author) ? authorText.textContent = 'Unknown'
    : authorText.textContent = quote.author;
    // Check quote length for styling
    quote.text.length > 100 ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove ('long-quote');
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quote from API
async function getQuote(){
    loading();

    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        newQuote();
    }
    catch(error){
        // getQuote();
        console.log('OOps something is wrong',error);
    }
}

//Tweet Quote
function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();

