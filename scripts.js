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

const userSearch = document.querySelector("[data-search]");

//search bar
userSearch.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase(); // lowercase the search input
    let filteredBooks = books.filter(book => // filter based on title, author, publisher, genre
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.publisher.toLowerCase().includes(keyword) ||
        (book.genres && book.genres.join().toLowerCase().includes(keyword))
    );

    // Show filtered books
    showCards(filteredBooks);
});

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
        const nextCard = templateCard.cloneNode(true); // Clone the template card and set as true
        editCardContent(nextCard, book); // Edit book name and cover image
        cardContainer.appendChild(nextCard); // Add new card to the container
       /* if ((i + 1) % 4 === 0) { //provides line spacing format to make book covers only show 4 in a row
            const lineBreak = document.createElement("br");
            cardContainer.appendChild(lineBreak);
        }*/
    }
}

function editCardContent(card, newBook) {
    card.style.display = "block";

    const cardDesc = card.querySelector(".book-description");
    cardDesc.innerText = newBook.description + " - " + newBook.descriptionSource;

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newBook.title;

    const cardImage = card.querySelector("img");
    cardImage.src = newBook.imgUrl;
    cardImage.alt = newBook.title + " Cover";

    const cardPoint = card.querySelector("li");
    cardPoint.textContent = "GoodReads Average Rating: " + newBook.rating;

    const cardPoint2 = card.querySelector("li:nth-child(2)");
    cardPoint2.textContent = "Personal Rating: " + newBook.opinion;

    const cardPoint3 = card.querySelector("li:nth-child(3)");
    cardPoint3.textContent = "Genres: " + newBook.genres;
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

function removeFirstCard(){
    if (books.length === 0) {
        alert("No more cards left to delete!")
    }
    books.shift(); //removal of first item in books array
    showCards();
}

//function that allows user to remove specific titles of books
function removeATitle(){
    if (books.length === 0) {
        alert("You've deleted all of the books remaining!")
    }
    const specificTitle = prompt("Please provide the exact title name of the book you'd like to remove: ").toLowerCase();
    if (!books.find(book => book.title.toLowerCase() === specificTitle.toLowerCase())) {
        alert("Book title not found. Please provide EXACT title of book and try again.")
    }
    else {
        const filteredBooks = books.filter(book => book.title.toLowerCase() !== specificTitle);
        showCards(filteredBooks);
    }
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
    const randoIndex = Math.floor(Math.random() * quotes.length); //generate random index, round down to make it a whole num
    const randoQuote = quotes[randoIndex];
    const message = `"${randoQuote.quote}" - ${randoQuote.author}`;
    alert(message);
}

// Event listener for all sort buttons
const sortButtons = document.querySelectorAll(".sort-btn");
sortButtons.forEach(button => {
    button.addEventListener("click", function() {
        const sortType = button.id.split("-")[1]; //id name 'sort-sortType', takes sortType only into switch
        switch(sortType){
            case "author":
            case "title":
                books.sort(alphabeticalSort(sortType));
                break;
            case "publicationYear":
                books.sort(numericalSort(sortType));
                break;
            case "opinion":
            case "rating":
                books.sort(numericalSort(sortType));
                books.reverse();
                break;
        }
        showCards();
    });
});

document.getElementById("last-card-popper").addEventListener("click", removeLastCard);
document.getElementById("first-card-popper").addEventListener("click", removeFirstCard);
document.getElementById("quote-generator").addEventListener("click", randomQuoteGenerator);
document.getElementById("remove-a-book").addEventListener("click", removeATitle);
