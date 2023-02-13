const formModal = document.querySelector('#submitNewBookModal');
const form = document.querySelector('#submissionForm');
const formTitle = document.querySelector('#formTitle');
const formAuthor = document.querySelector('#formAuthor');
const formPages = document.querySelector('#formPages');
const formStatus = document.querySelector('#formReadingStatus');
const submitButton = document.getElementById('submitBookBtn');
const bookContainer = document.getElementById('bookContainer');

let myLibrary = [
    {
        title: "Ulysses",
        author: "James Joyce",
        pages: 535,
        read: "no",
        index: 0,
    },
    {
        title: "The Great Gatsby",
        author: "F Scott Fitgerald",
        pages: 66,
        read: "yes",
        index: 1,
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        pages: 999,
        read: "reading",
        index: 2,
    },
    {
        title: "Jurassic Park",
        author: "Him",
        pages: 289,
        read: "yes",
        index: 3,
    },
    {
        title: "Shining",
        author: "Stephen King",
        pages: 273,
        read: "no",
        index: 4,
    },
    {
        title: "Jack Reacher",
        author: "dudes Name",
        pages: 132,
        read: "reading",
        index: 5,
    },
];

function Book2(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = myLibrary.length;
    console.log(`Just Submitted: ${this}`);
    console.log(this);
    myLibrary.push(this);
    removeAllCards(bookContainer);
    displayLibrary();
}

function Book(title, author, pages, read) {
    const obj = {};
    obj.title = title;
    obj.author = author;
    obj.pages = pages;
    obj.read = read;
    obj.index = myLibrary.length;
    myLibrary.push(obj);
    removeAllCards(bookContainer);
    displayLibrary();
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // edit the function name below to test the constructor function
    new Book2(formTitle.value, formAuthor.value, formPages.value, formStatus.value);
    console.log("The Updated Library is this:")
    console.log(myLibrary);
})

function enableEditButtons() {
    let editButtons = document.querySelectorAll('.editBook');
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', () => {
            console.log('EDIT was clicked');
        })
    })
};

function enableDeleteButtons() {
    let deleteButtons = document.querySelectorAll('.deleteBook');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (evt) => {
            let cardHere = evt.target.parentNode.parentNode;
            let titleHere = cardHere.firstChild.innerText;
            console.log(titleHere);
            let bookMatchTitle = myLibrary.find(element => element.title == titleHere);
            console.log(bookMatchTitle);
            let indexMatch = bookMatchTitle.index;
            console.log(indexMatch);
            myLibrary.splice(indexMatch, 1);
            console.log(myLibrary);
            // sometimes nothing happening when trying to delete last displayed card
            removeAllCards(bookContainer);
            displayLibrary();
        })
    })
};

function removeAllCards(bookContainer) {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
}

function displayLibrary() {
    for (let book of myLibrary) {
        //create div for Book values
        const card = document.createElement('div');
        bookContainer.appendChild(card);
        card.classList.add('bookCard');
        //create HTML tag for book.title
        //insert book.title
        const bookTitle = document.createElement('h2');
        bookTitle.innerText = `${book.title}`;
        card.appendChild(bookTitle);
        bookTitle.classList.add('title');

        //create image
        const bookImage = document.createElement('img');
        bookImage.src = `https://robohash.org/${book.title}`
        card.appendChild(bookImage);
        bookImage.classList.add('bookGraphic');
        //create HTML tag for book.author
        //insert book.author
        const bookAuthor = document.createElement('h3');
        bookAuthor.innerText = `${book.author}`;
        card.appendChild(bookAuthor);
        bookAuthor.classList.add('author');
        //create HTML tag for book.pages
        //insert book.pages
        const bookPages = document.createElement('p');
        bookPages.innerText = `${book.pages}`;
        card.appendChild(bookPages);
        bookPages.classList.add('pages');
        //create HTML tag for book.read
        //insert book.read
        const bookRead = document.createElement('p');
        bookRead.innerText = `${book.read}`;
        card.appendChild(bookRead);
        bookRead.classList.add('read');
        //create HTML tag for flex div
        //insert flex div
        const cardFooter = document.createElement('div');
        card.append(cardFooter);
        cardFooter.classList.add('cardFooter');
        //create HTML tag for delete
        //insert delete
        const deleteBook = document.createElement('p');
        deleteBook.innerText = 'Delete';
        cardFooter.appendChild(deleteBook);
        deleteBook.classList.add('deleteBook', 'btn', 'btn-primary', 'btn-sm');
        //create HTML tag for edit
        //insert edit
        const editBook = document.createElement('p');
        editBook.innerText = 'Edit';
        cardFooter.appendChild(editBook);
        editBook.classList.add('editBook', 'btn', 'btn-primary', 'btn-sm');
    }
    console.log("displayed library");
    enableEditButtons();
    console.log("edit buttons enabled");
    enableDeleteButtons();
    console.log("delete buttons enabled");
}

displayLibrary();

// janky way I could possibly get the delete function working
//on delete click, find closest H2 in card (book title)
// search if that h2 tag matches anything in the array
// if true, delete that