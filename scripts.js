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
function showCards(filteredBooks) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    const booksToDisplay = filteredBooks || books;
    for (let i = 0; i < booksToDisplay.length; i++) { //iterates through books array
        const book = booksToDisplay[i];
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

// loads books array of objects automatically when user goes on page
document.addEventListener("DOMContentLoaded", function(){
    showCards();
});

function removeLastCard() {
    if (books.length === 0) {
        alert("No more cards left to delete!")
    }
    books.pop(); // Remove last item in books array
    showCards();
}

//function that returns a string's properties in alphabetical order, used tertiary op
function alphabeticalSort(property) {
    return (a, b) => {
        return (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : -1;
    };
}

//function that returns a number's properties in ascending order
function numericalSort(property){
    return (a, b) => {
        return a[property] - b[property];
    }
}

function randomQuoteGenerator() {
    const randomIndex = Math.floor(Math.random() * quotes.length); //generate random index, round down to make it a whole num
    const randoQuote = quotes[randomIndex];
    const message = `"${randoQuote.quote}" - ${randoQuote.author}`;
    alert(message);
}

// Event listener for all sort buttons
const sortButtons = document.querySelectorAll(".sort-btn");
sortButtons.forEach(button => {
    button.addEventListener("click", function() {
        const sortType = button.id.split("-")[1]; //sort-sortType
        switch(sortType){
            case "author":
                books.sort(alphabeticalSort("author"));
                break;
            case "title":
                books.sort(alphabeticalSort("title"));
                break;
            case "publicationYear":
                books.sort(numericalSort("publicationYear"));
                break;
            case "rating":
                books.sort(numericalSort("rating"));
                break;
            case "opinion":
                books.sort(numericalSort("opinion"));
                break;
        }
        showCards();
    });
});

document.getElementById("card-popper").addEventListener("click", removeLastCard);
document.getElementById("quote-generator").addEventListener("click", randomQuoteGenerator);

// Event listener for all genre filter buttons
const genreFilterButtons = document.querySelectorAll(".genre-filter-btn");
genreFilterButtons.forEach(button => {
    button.addEventListener("click", function() {
        const genre = button.id.split("-")[1]; //filter-genre
        genreFilter(genre);
    });
});

function genreFilter(bookGenre){
    const filteredBooks = books.filter(book => book.genres && book.genres.some(genre => genre.includes(bookGenre)));
    showCards(filteredBooks);
}





