document.addEventListener('DOMContentLoaded', () => {
    const inputBookForm = document.getElementById('inputBookForm');
    const searchBookForm = document.getElementById('searchBookForm');
    const unreadBooksList = document.getElementById('unreadBooksList');
    const readBooksList = document.getElementById('readBooksList');

    let books = [];

    inputBookForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = document.getElementById('inputBookYear').value;
        const date = document.getElementById('inputBookDate').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;

        const confirmation = confirm(`Anda akan memasukkan buku dengan detail berikut:
        Judul: ${title}
        Penulis: ${author}
        Tahun: ${year}
        Tanggal Terakhir Baca: ${date}
        Selesai dibaca: ${isComplete ? 'Ya' : 'Tidak'}
        Apakah Anda yakin?`);

        if (confirmation) {
            const newBook = {
                id: +new Date(),
                title,
                author,
                year,
                date,
                isComplete
            };

            books.push(newBook);
            inputBookForm.reset();
            renderBooks();
        }
    });

    searchBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('searchBookTitle').value.toLowerCase();
        renderBooks(searchTerm);
    });

    function renderBooks(searchTerm = '') {
        unreadBooksList.innerHTML = '';
        readBooksList.innerHTML = '';

        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

        filteredBooks.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                readBooksList.appendChild(bookElement);
            } else {
                unreadBooksList.appendChild(bookElement);
            }
        });
    }

    function createBookElement(book) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const bookTitle = document.createElement('h4');
        bookTitle.innerText = book.title;

        const bookDetails = document.createElement('p');
        bookDetails.innerText = `Penulis: ${book.author}, Tahun: ${book.year}, Tanggal Terakhir Baca: ${book.date}`;

        const toggleButton = document.createElement('button');
        toggleButton.innerText = book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca';
        toggleButton.addEventListener('click', () => {
            book.isComplete = !book.isComplete;
            renderBooks();
        });

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookDetails);
        bookItem.appendChild(toggleButton);

        return bookItem;
    }

    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.onscroll = function() {
        const backToTopButton = document.getElementById('backToTop');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
});
