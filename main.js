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

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    }

    function renderBooks(filteredBooks = books) {
        unreadBooksList.innerHTML = '';
        readBooksList.innerHTML = '';

        let hasUnreadBooks = false;
        let hasReadBooks = false;

        filteredBooks.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');

            const bookTitle = document.createElement('h4');
            bookTitle.innerText = `Judul: ${book.title}`;

            const bookAuthor = document.createElement('p');
            bookAuthor.innerText = `Penulis: ${book.author}`;

            const bookYear = document.createElement('p');
            bookYear.innerText = `Tahun: ${book.year}`;

            const bookDate = document.createElement('p');
            bookDate.innerText = `Tanggal Terakhir Baca: ${formatDate(book.date)}`;

            const bookStatus = document.createElement('button');
            bookStatus.classList.add('status-button');
            bookStatus.innerText = book.isComplete ? 'Belum Selesai' : 'Selesai';
            bookStatus.addEventListener('click', () => {
                book.isComplete = !book.isComplete;
                saveBooks();
                renderBooks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerText = 'Hapus';
            deleteButton.addEventListener('click', () => {
                deleteBook(index);
            });

            bookItem.append(bookTitle, bookAuthor, bookYear, bookDate, bookStatus, deleteButton);

            if (book.isComplete) {
                readBooksList.appendChild(bookItem);
                hasReadBooks = true;
            } else {
                unreadBooksList.appendChild(bookItem);
                hasUnreadBooks = true;
            }
        });

        if (!hasUnreadBooks) {
            const noBooksMessage = document.createElement('p');
            noBooksMessage.innerText = 'Tidak ada buku yang belum selesai dibaca berjudul yang seperti anda cari';
            unreadBooksList.appendChild(noBooksMessage);
        }

        if (!hasReadBooks) {
            const noBooksMessage = document.createElement('p');
            noBooksMessage.innerText = 'Tidak ada buku yang sudah selesai dibaca berjudul yang seperti anda cari';
            readBooksList.appendChild(noBooksMessage);
        }
    }

    inputBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = +new Date();
        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = parseInt(document.getElementById('inputBookYear').value, 10);
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
            renderBooks();
        } else {
            renderBooks(books);
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
