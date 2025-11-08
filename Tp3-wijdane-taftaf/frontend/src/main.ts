import { Book, Status, Format } from './Book.js';

const API_URL = 'http://localhost:3000/api/books';

const form = document.getElementById('book-form') as HTMLFormElement;
const list = document.getElementById('book-list') as HTMLDivElement;
const totalBooksSpan = document.getElementById('total-books')!;
const totalPagesSpan = document.getElementById('total-pages')!;

let books: Book[] = [];

async function fetchBooks() {
  const res = await fetch(API_URL);
  const data = await res.json();
  books = data.map((b: any) => new Book(
    b._id,
    b.title,
    b.author,
    b.pages,
    b.status as Status,
    b.price,
    b.pagesRead,
    b.format as Format,
    b.suggestedBy,
    b.finished
  ));
  render();
}

function render() {
  list.innerHTML = '';

  let totalPagesRead = 0;
  let totalFinished = 0;

  books.forEach(book => {
    totalPagesRead += book.pagesRead;
    if (book.finished) totalFinished++;

    const div = document.createElement('div');
    div.className = 'bg-slate-800 rounded-2xl p-3 flex justify-between items-center';

    div.innerHTML = `
      <div>
        <div class="font-semibold">${book.title}</div>
        <div class="text-xs text-slate-400">${book.author} • ${book.format} • ${book.status}</div>
        <div class="text-xs mt-1">
          ${book.pagesRead}/${book.pages} pages (${book.currentlyAt()})
          ${book.finished ? '<span class="ml-2 text-emerald-400 font-semibold">Finished</span>' : ''}
        </div>
      </div>
      <button class="delete bg-red-500 hover:bg-red-600 text-xs px-3 py-1 rounded-xl">Delete</button>
    `;

    const deleteBtn = div.querySelector('.delete') as HTMLButtonElement;
    deleteBtn.addEventListener('click', async () => {
      if (book._id) {
        await book.deleteBook();
        books = books.filter(b => b._id !== book._id);
        render();
      }
    });

    list.appendChild(div);
  });

  totalBooksSpan.textContent = `Total books: ${books.length} (Finished: ${totalFinished})`;
  totalPagesSpan.textContent = `Total pages read: ${totalPagesRead}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const pages = Number(formData.get('pages'));
  const pagesRead = Number(formData.get('pagesRead'));

  if (pagesRead > pages) {
    alert('Pages read must be <= pages.');
    return;
  }

  const body = {
    title: formData.get('title'),
    author: formData.get('author'),
    pages,
    status: formData.get('status'),
    price: Number(formData.get('price')),
    pagesRead,
    format: formData.get('format'),
    suggestedBy: formData.get('suggestedBy') || ''
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const saved = await res.json();

  const newBook = new Book(
    saved._id,
    saved.title,
    saved.author,
    saved.pages,
    saved.status,
    saved.price,
    saved.pagesRead,
    saved.format,
    saved.suggestedBy,
    saved.finished
  );

  books.push(newBook);
  render();
  form.reset();
});

fetchBooks();
