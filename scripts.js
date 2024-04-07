/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 */

import books from "./books.js";
import quotes from "./quotes.js";

// This function adds cards the page to display the data in the array of objects (books!)
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (let i = 0; i < books.length; i++) { //iterates through books array
        const book = books[i];
        const bookImage = document.createElement("img");
        bookImage.src = book.imgUrl;
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, book, bookImage); // Edit book name and cover image
        cardContainer.appendChild(nextCard); // Add new card to the container

        if ((i + 1) % 4 === 0) { //provides line spacing format to make book covers only show 4 in a row
            const lineBreak = document.createElement("br");
            cardContainer.appendChild(lineBreak);
        }
    }
}
function editCardContent(card, newBook) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newBook.title;

    const cardImage = card.querySelector("img");
    cardImage.src = newBook.imgUrl;
    cardImage.alt = newBook.title + " Cover";

    const cardPoint = card.querySelector("li");
    cardPoint.textContent = "GoodReads Average Rating: " + newBook.rating;

    const cardPoint2 = card.querySelector("li:nth-child(2)");
    cardPoint2.textContent = "Personal Rating: " + newBook.opinion;
}

// Calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function removeLastCard() {
    if (books.length === 0) {
        alert("No more cards left to delete!")
    }
    books.pop(); // Remove last item in books array
    showCards(); // Call showCards again to refresh
}

function sortByAuthor(){
    books.sort(alphabeticalSort("author"));
    showCards();
}

function sortByTitle(){
    books.sort(alphabeticalSort("title"));
    showCards();
}

//function that returns a string's properties in alphabetical order (asc)
function alphabeticalSort(property) {
    return function (a, b) {
        if (a[property].toLowerCase() < b[property].toLowerCase()) {
            return -1;
        } else if (a[property].toLowerCase() > b[property].toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortByAvgRating(){
    books.sort(numericalSort("rating"));
    showCards();
}

function sortByPersonalOpinion() {
    books.sort(numericalSort("opinion"));
    showCards();
}

function sortByPubYear(){
    books.sort(numericalSort("publicationYear"));
    showCards();
}

//function that returns a number's properties in ascending order
function numericalSort(property){
    return function(a, b) {
        return a[property] - b[property];
    }
}

function randomQuoteGenerator() {
    const randomIndex = Math.floor(Math.random() * quotes.length); //generate random index, round down to make it a whole num
    const randoQuote = quotes[randomIndex];
    const message = `"${randoQuote.quote}" - ${randoQuote.author}`;
    alert(message);
}

//event Listener sections! allows buttons to work!
document.getElementById("sort-by-author-btn").addEventListener("click", sortByAuthor);
document.getElementById("sort-by-avg-btn").addEventListener("click", sortByAvgRating);
document.getElementById("sort-by-opinion-btn").addEventListener("click", sortByPersonalOpinion);
document.getElementById("sort-by-pub-year").addEventListener("click", sortByPubYear);
document.getElementById("sort-by-title").addEventListener("click", sortByTitle);
document.getElementById("card-popper").addEventListener("click", removeLastCard);
document.getElementById("quote-generator").addEventListener("click", randomQuoteGenerator);

