document.addEventListener('DOMContentLoaded', () => {
    const inputBookForm = document.getElementById('inputBookForm');
    const searchBookForm = document.getElementById('searchBookForm');
    const unreadBooksList = document.getElementById('unreadBooksList');
    const readBooksList = document.getElementById('readBooksList');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function addBook(book) {
        books.push(book);
        saveBooks();
        renderBooks();
    }

    function deleteBook(index) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    }

    function renderBooks() {
        unreadBooksList.innerHTML = '';
        readBooksList.innerHTML = '';

        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');

            const bookTitle = document.createElement('h4');
            bookTitle.innerText = `Judul: ${book.title}`;

            const bookAuthor = document.createElement('p');
            bookAuthor.innerText = `Penulis: ${book.author}`;

            const bookYear = document.createElement('p');
            bookYear.innerText = `Tahun: ${book.year}`;

            const bookDate = document.createElement('p');
            bookDate.innerText = `Tanggal Terakhir Baca: ${book.date}`;

            const bookStatus = document.createElement('button');
            bookStatus.innerText = book.isComplete ? 'Belum Selesai' : 'Selesai';
            bookStatus.addEventListener('click', () => {
                book.isComplete = !book.isComplete;
                saveBooks();
                renderBooks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.innerText = 'Hapus';
            deleteButton.addEventListener('click', () => {
                deleteBook(index);
            });

            bookItem.append(bookTitle, bookAuthor, bookYear, bookDate, bookStatus, deleteButton);

            if (book.isComplete) {
                readBooksList.appendChild(bookItem);
            } else {
                unreadBooksList.appendChild(bookItem);
            }
        });
    }

    inputBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = +new Date()
        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = document.getElementById('inputBookYear').value;
        const date = document.getElementById('inputBookDate').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;

        const newBook = {
            id,
            title,
            author,
            year,
            date,
            isComplete
        };

        addBook(newBook);
        inputBookForm.reset();
    });

    searchBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));

        if (searchTitle) {
            if (filteredBooks.length) {
                books = filteredBooks;
                renderBooks();
                books = JSON.parse(localStorage.getItem('books')) || [];
            } else {
                alert('Buku tidak ditemukan');
            }
        } else {
            alert('Silakan masukkan judul buku yang ingin dicari');
        }
    });

    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const backToTopButton = document.getElementById('backToTop');
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    renderBooks();
});
