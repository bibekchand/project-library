const myLibrary = [];
function Book(title, author, number, readCondition) {
  this.title = title;
  this.author = author;
  this.numberOfPages = number;
  this.read = readCondition;
}
//create a function that can take some arguments create a book object from the argument and store that in array
function addBook(title, author, number, readCondition) {
  title = new Book(title, author, number, readCondition);
  myLibrary.push(title);
}
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add-button");
const form = document.querySelector("form");
// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) return;
  else {
    //empty the cards else it would be redrawn over and over again
    document.querySelector(".cards").textContent = "";
    addBook(
      document.querySelector("#title").value,
      document.querySelector("#author").value,
      document.querySelector("#pages").value,
      document.querySelector("#read").checked
    );
    loopArrayandDisplay();
    dialog.close();
  }
});

//create a div, imaginary div first let's not imagine

function loopArrayandDisplay() {
  let cards = document.querySelector(".cards");
  myLibrary.forEach((item, index) => {
    //create card 
    let div = document.createElement("div");
    div.setAttribute("class", "card");

    //create the title and append inside of it
    let title = document.createElement("div");
    title.textContent = `Title: ${item.title}`;
    div.appendChild(title);
    //create the author div and append inside of it
    let author = document.createElement("div");
    author.textContent = ` Written by: ${item.author}`;
    div.appendChild(author);
    //create the no of pages read and append inside of it
    let pages = document.createElement("div");
    pages.textContent = ` Pages read: ${item.numberOfPages}`;
    div.appendChild(pages);
    //create buttons container
    let buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons");
    //set index for every button element 
    buttons.setAttribute(`data-index`, index);
    //add the event listener to the buttons 
    buttons.addEventListener("click", myFunc);
    //create delete button and append inside the buttons container
    let deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletebutton.setAttribute("class", "delete");
    //create read or not button according the the read value and append inside of the buttons
    let readbutton = document.createElement("button");
    readbutton.setAttribute("class", "read");
    readbutton.textContent = item.read ? "Read" : "Not Read";
    if(!item.read) readbutton.classList.add("notRead");
    buttons.appendChild(readbutton);
    buttons.appendChild(deletebutton);
    //append buttons inside of div
    div.appendChild(buttons);
    //append div inside of  the cards
    cards.appendChild(div);
  });
}

function myFunc(e){
  index = e.currentTarget.getAttribute("data-index");

    if(e.target.classList.contains("read"))
    {
      myLibrary[index].read = !myLibrary[index].read;
    }
    if(e.target.classList.contains("delete"))
    {
      myLibrary.splice(index, 1);
    }
    document.querySelector(".cards").textContent = "";
    loopArrayandDisplay();

}
