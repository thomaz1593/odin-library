const container = document.querySelector(".container");
const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const inputTitle = document.getElementById("title-input");
const inputAuthor = document.getElementById("author-input");
const inputPages = document.getElementById("pages-input");
const inputRead = document.getElementById("read-input");
const confirmBtn = bookDialog.querySelector("#confirmBtn");
const closeButton = bookDialog.querySelector("#closeBtn");

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooksList() {
  container.innerHTML = "";

  myLibrary.forEach((item, index) => {
    const divBook = document.createElement("div");
    divBook.classList.add("book-card");

    const h2 = document.createElement("h3");
    h2.classList.add("book-title");
    h2.textContent = `📖 ${item.title}`.toUpperCase();
    divBook.appendChild(h2);

    const h4 = document.createElement("h4");
    h4.classList.add("book-author");
    h4.textContent = `🖋 ${item.author}`;
    divBook.appendChild(h4);

    const pItem = document.createElement("p");
    pItem.classList.add("book-pages");
    pItem.textContent = `🔖 ${item.pages} pages`;
    divBook.appendChild(pItem);

    const divToggle = document.createElement("div");
    divToggle.classList.add("toggle-read");
    const span = document.createElement("span");
    span.classList.add("book-read");
    span.textContent = `❓ Read? ${item.read ? "Yes" : "No"}`;
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.textContent = "Toggle";
    toggleButton.addEventListener("click", () => {
      item.read = !item.read;
      span.textContent = `❓ Read? ${item.read ? "Yes" : "No"}`;
    });
    divToggle.appendChild(span);
    divToggle.appendChild(toggleButton);
    divBook.appendChild(divToggle);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteBook(index));
    divBook.appendChild(deleteButton);

    container.appendChild(divBook);
  });
}

function resetForm() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputRead.checked = false;
}

showButton.addEventListener("click", () => {
  bookDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!inputTitle.value || !inputAuthor.value || !inputPages.value) return;

  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputRead.checked
  );

  resetForm();
  displayBooksList();
  bookDialog.close();
});

closeButton.addEventListener("click", () => {
  bookDialog.close();
});

function deleteBook(index) {
  confirm("Delete item?") ? myLibrary.splice(index, 1) : false;
  displayBooksList();
}
