const RENDER_EVENT = 'render_bookshelf';
const SAVED_EVENT = 'saved_bookshelf';
const MOVED_EVENT = 'moved_event';
const REMOVED_EVENT = 'removed_event';
const STORAGE_KEY = 'BOOKSHELF_APPS';

const bookshelf = [];

const ICON_ACTION = {
    TRASH: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style=" fill:#000000;"><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path></svg>',
    UNDO: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style=" fill:#000000;"><path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"></path></svg>',
    CHECK: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style=" fill:#000000;"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"></path></svg>',
};

const sidebarItemElemets = document.querySelectorAll(".sidebar-item li");
const itemElements = document.querySelectorAll(".item");

for (let i = 0; i < sidebarItemElemets.length; i++) {
  sidebarItemElemets[i].addEventListener("click", function() {

    sidebarItemElemets.forEach((sidebarItem) => sidebarItem.classList.remove("active"));
    this.classList.add("active");

    const sidebarItemValue = this.getAttribute("data-li");
    itemElements.forEach((item) => item.style.display = "none");

    if (sidebarItemValue == "add") document.querySelector("." + sidebarItemValue).style.display = "block";
    else if (sidebarItemValue == "unread") document.querySelector("." + sidebarItemValue).style.display = "block";
    else if (sidebarItemValue == "read") document.querySelector("." + sidebarItemValue).style.display = "block";
  });
}

function isStorageExist() {
    if (typeof Storage === "undefined") {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    if (isStorageExist()) { loadDataFromStorage(); }

    const formSubmit = document.getElementById('inputBook');
    formSubmit.addEventListener('submit', function(event) {
        event.preventDefault();
        addBookshelf();
    });

    const formSearch = document.getElementById('searchBook');
    formSearch.addEventListener('submit', function(event) {
        event.preventDefault();
        searchBookshelf();
    });
});

document.addEventListener(RENDER_EVENT, function () {
    console.log(bookshelf);
    const uncompletedTODOList = document.getElementById('incompleteBookshelfList');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completeBookshelfList');
    completedTODOList.innerHTML = '';
    
    for (const bookItem of bookshelf) {
        const bookElement = makeBookshelf(bookItem);
        if (!bookItem.isCompleted) uncompletedTODOList.append(bookElement);
        else completedTODOList.append(bookElement);
    }
});

document.addEventListener(SAVED_EVENT, () => alertMessage("Buku Berhasil Disimpan.."));
document.addEventListener(MOVED_EVENT, () => alertMessage("Buku Berhasil Dipindahkan.."));
document.addEventListener(REMOVED_EVENT, () => alertMessage("Buku Berhasil Dihapus.."));

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const bookItem of data) {
            bookshelf.push(bookItem);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBookshelf() {
    const inputBookTitle = document.getElementById('inputBookTitle');
    const inputBookAuthor = document.getElementById('inputBookAuthor');
    const inputBookYear = document.getElementById('inputBookYear');
    const inputBookIsComplete = getChecbox();

    const generateID = generateId();
    const bookshelfObject = generateBookshelfObject(generateID, inputBookTitle.value, inputBookAuthor.value, inputBookYear.value, inputBookIsComplete);
    bookshelf.push(bookshelfObject);

    inputBookTitle.value = null;
    inputBookAuthor.value = null;
    inputBookYear.value = null;
    document.getElementById('inputBookIsComplete').checked = false;
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookshelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function movedData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookshelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(MOVED_EVENT));
    }
}

function removedData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookshelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(REMOVED_EVENT));
    }
}

function searchBookshelf() {
    const inputSearchBook = document.getElementById('searchBookTitle').value.toLowerCase();
    const bookItems = document.querySelectorAll(".book-item");

    for (let i = 0; i < bookItems.length; i++) {
        const itemTitle = bookItems[i].querySelector(".book-container h3");
        if (itemTitle.textContent.toLowerCase().includes(inputSearchBook)) {
            bookItems[i].classList.remove("hidden");
        } else {
            bookItems[i].classList.add("hidden");
        }
    }
}

function makeBookshelf(bookshelfObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookshelfObject.title;

    const textPenulis = document.createElement('p');
    textPenulis.innerText = bookshelfObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookshelfObject.year;

    const bookContent = document.createElement('div');
    bookContent.classList.add('book-content');
    bookContent.append(textPenulis, textYear);

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    bookContainer.append(textTitle, bookContent);

    const articleContainer = document.createElement('article');
    articleContainer.classList.add('book-item');
    articleContainer.append(bookContainer);
    articleContainer.setAttribute('id', `bookshelf-${bookshelfObject.id}`);

    if (bookshelfObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
        undoButton.title = "Buku belum selesai dibaca";
        undoButton.innerHTML = ICON_ACTION.UNDO;
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        trashButton.title = "Hapus buku";
        trashButton.innerHTML = ICON_ACTION.TRASH;

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(undoButton, trashButton);

        undoButton.addEventListener('click', () => undoBookFromCompleted(bookshelfObject.id));
        trashButton.addEventListener('click', () => {
            customDialog(() => removeBookInCompletedAndCompleted(bookshelfObject.id))
        });

        articleContainer.append(actionContainer);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        checkButton.title = "Buku selesai dibaca";
        checkButton.innerHTML = ICON_ACTION.CHECK;

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        trashButton.title = "Hapus buku";
        trashButton.innerHTML = ICON_ACTION.TRASH;

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(checkButton, trashButton);

        checkButton.addEventListener('click', () => addBookToCompleted(bookshelfObject.id));
        trashButton.addEventListener('click', () => {
            customDialog(() => removeBookInCompletedAndCompleted(bookshelfObject.id))
        });
        
        articleContainer.append(actionContainer);
    }
   
    return articleContainer;
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    movedData();
}

function removeBookInCompletedAndCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    bookshelf.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    removedData();
}

function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    movedData();
}

function findBook(bookId) {
    for (const todoItem of bookshelf) {
        if (todoItem.id === bookId) {
            return todoItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in bookshelf) {
      if (bookshelf[index].id === bookId) {
        return index;
      }
    }
   
    return -1;
}

function generateBookshelfObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    }
}

function generateId() {
    return +new Date();
}

function getChecbox() {
    const inputElements = document.getElementById('inputBookIsComplete');
    const textInputButton = document.querySelector('.input-section form button span');

    if (inputElements.checked) {
        textInputButton.innerText = "Selesai dibaca";
        return checkedValue = true;
    } else {
        textInputButton.innerText = "Belum selesai dibaca";
        return checkedValue = false;
    }
}

function alertMessage(message) {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert");

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.setAttribute('onclick', 'this.parentElement.style.display="none";');
    closeBtn.innerHTML = "&times;";

    alertContainer.append(closeBtn, message);
    
    document.body.insertBefore(alertContainer, document.body.children[0]);
    setTimeout(() => alertContainer.remove(), 3000);
}
  
function customDialog(callback) {
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog');

    const titleDialog = document.createElement('h2');
    titleDialog.innerText = "Konfirmasi";
    const messageDialog = document.createElement('p');
    messageDialog.innerText = "Apakah yakin ingin hapus buku ini?";

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-remove');

    const btnConfirm = document.createElement('button');
    btnConfirm.setAttribute('id', 'dialog-confirm');
    btnConfirm.setAttribute('type', 'button');
    btnConfirm.innerText = "Hapus";

    const btnCancel = document.createElement('button');
    btnCancel.setAttribute('id', 'dialog-cancel');
    btnCancel.setAttribute('type', 'button');
    btnCancel.innerText = "Batalkan";

    btnContainer.append(btnConfirm, btnCancel);
    dialogContainer.append(titleDialog, messageDialog, btnContainer);
    document.body.appendChild(dialogContainer);
  
    const dialogConfirm = dialogContainer.querySelector("#dialog-confirm");
    const dialogCancel = dialogContainer.querySelector("#dialog-cancel");
  
    dialogConfirm.addEventListener("click", () => {
        dialogContainer.remove();
        callback();
    });
  
    dialogCancel.addEventListener("click", () => {
        dialogContainer.remove();
    });
}