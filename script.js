const booksContainer = document.querySelector(".booksContainer");
const addBook = document.querySelector(".addBook");
const addBtn = document.querySelector(".addBtn");
const bookModal = document.querySelector(".bookModal");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});
let myLibrary = [];

getLibrary();

function Book(author, title, pages, readStatus) {
  // the constructor...
  const newBook = {};
  newBook.author = author;
  newBook.title = title;
  newBook.pages = pages;
  newBook.read = readStatus;

  myLibrary.push(newBook);
  saveLibrary();
  getLibrary();
  displayBooks();
}

function addBookToLibrary() {
  // do stuff here
  const title = document.querySelector("#bookTitle").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const readOrNot = document.querySelector(".doneAddReading").checked;

  Book(author, title, pages, readOrNot);
  updateReadStatus();
  document.querySelector("form").reset();
  bookModal.close();
}

function displayBooks() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((bookObject, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    const title = document.createElement("h2");
    title.textContent = bookObject.title;
    const author = document.createElement("h3");
    author.textContent = bookObject.author;
    const pages = document.createElement("h4");
    pages.textContent = "Pages: " + bookObject.pages;
    const readContainer = document.createElement("div");
    const readStatus = document.createElement("input");
    readStatus.type = "checkbox";
    readStatus.checked = false;
    if (bookObject.read) readStatus.checked = true;
    readStatus.classList = "doneReading";
    const readOrNot = document.createElement("h5");
    readOrNot.textContent = "Done Reading?";
    readContainer.classList = "readContainer";
    readContainer.append(readOrNot, readStatus);
    const deleteBook = document.createElement("div");
    deleteBook.innerHTML = `<svg class='svgIcon' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M465.423,48.241h-137.61V23.955C327.813,10.746,317.082,0,303.893,0h-95.785c-13.19,0-23.92,10.746-23.92,23.955V48.24    H46.577c-6.655,0-12.049,5.394-12.049,12.049c0,6.655,5.394,12.049,12.049,12.049h22.332l15.228,396.396    C85.069,492.995,104.818,512,129.099,512h253.804c24.281,0,44.03-19.006,44.96-43.267l15.228-396.396h22.332    c6.653,0,12.049-5.394,12.049-12.049C477.472,53.635,472.078,48.241,465.423,48.241z M208.285,24.097h95.43v24.143h-95.43V24.097z     M403.784,467.809c-0.433,11.268-9.605,20.094-20.882,20.094H129.099c-11.276,0-20.448-8.827-20.882-20.095L93.025,72.338h325.952    L403.784,467.809z"/>
	</g>
</g>
<g>
	<g>
		<path d="M182.63,181.571c-0.127-6.575-5.494-11.817-12.042-11.817c-0.078,0-0.158,0-0.236,0.002    c-6.652,0.128-11.943,5.626-11.815,12.278l3.781,196.634c0.126,6.575,5.495,11.817,12.042,11.817c0.078,0,0.158,0,0.236-0.002    c6.653-0.128,11.943-5.624,11.815-12.278L182.63,181.571z"/>
	</g>
</g>
<g>
	<g>
		<path d="M255.998,169.753c-6.654,0-12.049,5.394-12.049,12.049v196.634c0,6.654,5.394,12.049,12.049,12.049    c6.655,0,12.049-5.394,12.049-12.049V181.802C268.047,175.148,262.653,169.753,255.998,169.753z"/>
	</g>
</g>
<g>
	<g>
		<path d="M341.645,169.756c-6.628-0.147-12.151,5.162-12.278,11.815l-3.781,196.634c-0.129,6.653,5.162,12.15,11.815,12.278    c0.078,0.001,0.158,0.002,0.236,0.002c6.546,0,11.916-5.244,12.042-11.817l3.781-196.634    C353.588,175.38,348.299,169.883,341.645,169.756z"/>
	</g>
</g>
</svg>`;

    title.classList = "bookTitle";
    author.classList = "bookAuthor";
    pages.classList = "bookPages";
    deleteBook.classList = "deleteBook";
    deleteBook.setAttribute("index", index);
    deleteBook.addEventListener("click", deleteBookFun);
    bookCard.append(title, author, pages, readContainer, deleteBook);

    bookCard.setAttribute("index", index);
    booksContainer.appendChild(bookCard);
  });
}

displayBooks();

updateReadStatus();

function updateReadStatus() {
  document.querySelectorAll(".doneReading").forEach((element) => {
    element.addEventListener("change", function updateRead(e) {
      const index = element.parentElement.parentElement.getAttribute("index");
      myLibrary[index].read = element.checked;
      saveLibrary();
    });
  });
}

function deleteBookFun(e) {
  let index = e.currentTarget.getAttribute("index");

  myLibrary.splice(index, 1);
  saveLibrary();
  displayBooks();
  updateReadStatus();
}

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function getLibrary() {
  const libraryData = localStorage.getItem("myLibrary");
  if (libraryData) {
    myLibrary = JSON.parse(libraryData);
  }
}

addBook.addEventListener("click", () => {
  document.querySelector(".bookModal").showModal();
});
