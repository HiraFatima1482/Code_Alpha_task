// Book array to store books (or you can use localStorage)
let books = JSON.parse(localStorage.getItem('books')) || [];
let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

// Function to display books
function displayBooks(filteredBooks = books, isBorrowed = false) {
    const bookList = isBorrowed ? document.getElementById('borrowed-list') : document.getElementById('book-list');
    bookList.innerHTML = ''; // Clear existing books

    filteredBooks.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-4');
        bookCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author}</p>
                    <p class="card-text">Year: ${book.year}</p>
                    <p class="card-text">Category: ${book.category}</p>
                    <button class="btn btn-danger" onclick="deleteBook(${index})">Delete</button>
                    <button class="btn btn-success" onclick="borrowBook(${index})">Borrow</button>
                </div>
            </div>
        `;
        bookList.appendChild(bookCard);
        setTimeout(() => {
            bookCard.querySelector('.card').classList.add('visible');
        }, 100);
    });
}

// Function to add a book
function addBook(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const category = document.getElementById('category').value;

    const newBook = { title, author, year, category };
    books.push(newBook);

    // Save to localStorage
    localStorage.setItem('books', JSON.stringify(books));

    // Clear the form
    document.getElementById('book-form').reset();

    // Display updated list
    displayBooks();
    showToast();
}

// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1); // Remove book from array
    localStorage.setItem('books', JSON.stringify(books)); // Update localStorage
    displayBooks(); // Refresh book list
}

// Function to borrow a book
function borrowBook(index) {
    const borrowedBook = books[index];
    borrowedBooks.push(borrowedBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks)); // Update localStorage
    deleteBook(index); // Remove from main book list
    displayBooks(); // Refresh book list
    displayBooks(borrowedBooks, true); // Show borrowed books
}

// Function to search for books
function searchBooks() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => {
        return (
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.category.toLowerCase().includes(searchQuery)
        );
    });

    displayBooks(filteredBooks);
}

// Function to show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('search').addEventListener('keyup', searchBooks);

// Initial Display of Books
displayBooks();
displayBooks(borrowedBooks, true); // Display borrowed books
ss