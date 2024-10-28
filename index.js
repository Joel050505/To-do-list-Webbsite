// Plus button to add a new element.
const button = document.querySelector(".plus-btn");

// Selecting the body for the whole page;
const bodyEl = document.querySelector("body");

// Location to add items to
const list = document.querySelector(".ul-list");

// The input field where we type what we want to add to the list.
const input = document.querySelector(".input");

const inputField1 = document.querySelector("input");

// Erase button with an effect so you can remove certain to-do list.
const eraseButton = document.querySelector(".erase-btn");

function updateTime() {
  let now = new Date();
  let currentDateTime = now.toLocaleTimeString();

  let timeDisplay = document.querySelector(".time");
  timeDisplay.textContent = currentDateTime;
}
setInterval(updateTime, 1000);

// Load items from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const storedItems = JSON.parse(localStorage.getItem("itemList")) || [];
  storedItems.forEach((item) => {
    addListItem(item.text, item.date);
  });
});

// Save items to local storage function
function saveItems() {
  const items = Array.from(list.children).map((li) => {
    return {
      text: li.querySelector("span.text").textContent.slice(2), // Get text after ": "
      date: li.querySelector("span.date").textContent,
    };
  });
  localStorage.setItem("itemList", JSON.stringify(items));
}

// Function to add new items
function addListItem(text, date) {
  const newItem = document.createElement("li");

  let dateSpan = document.createElement("span");
  dateSpan.classList.add("date");
  dateSpan.textContent = date;

  let textSpan = document.createElement("span");
  textSpan.classList.add("text");
  textSpan.textContent = ": " + text;

  newItem.appendChild(dateSpan);
  newItem.appendChild(textSpan);

  let selectBox = document.createElement("i");
  let removeBox = document.createElement("i");
  let span = document.createElement("button");
  let icon = document.createElement("i");

  selectBox.classList.add("fa-regular", "fa-square");
  removeBox.classList.add("fa-solid", "fa-square-check");

  newItem.appendChild(selectBox);

  selectBox.addEventListener("click", function () {
    selectBox.remove();
    newItem.appendChild(removeBox);
    newItem.classList.toggle("selected-element");
    newItem.classList.toggle("checked");
    saveItems(); // Save after toggling
  });

  removeBox.addEventListener("click", function () {
    removeBox.remove();
    newItem.appendChild(selectBox);
    newItem.classList.toggle("selected-element");
    newItem.classList.toggle("checked");
    saveItems(); // Save after toggling
  });

  icon.classList.add("fa-solid", "fa-pen-to-square");
  span.appendChild(icon);

  span.addEventListener("click", function (event) {
    event.stopPropagation();

    let inputField = document.createElement("input");
    inputField.value = textSpan.textContent.slice(2); // Get text after ": "

    textSpan.textContent = "";

    inputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.stopPropagation();
        textSpan.textContent = ": " + inputField.value;
        inputField.remove();
        newItem.appendChild(span);
        newItem.appendChild(selectBox);
        newItem.classList.remove("selected-element");
        newItem.classList.remove("checked");
        saveItems(); // Save after editing
      }
    });
    textSpan.appendChild(inputField);
  });

  newItem.appendChild(span);

  eraseButton.addEventListener("click", function () {
    if (
      newItem.classList.contains("selected-element") &&
      newItem.classList.contains("checked")
    ) {
      newItem.remove();
      saveItems(); // Save after removing
    }
  });

  list.appendChild(newItem);
}

// Button function to add a new li with the text from the input that we write in.
// If the input contains ""/ empty string it won't make a li and print out a message
function btnFunction() {
  if (input.value !== "") {
    let rightNow = new Date();
    let currentDateTime2 = rightNow.toLocaleDateString();
    console.log(currentDateTime2);
    addListItem(input.value, currentDateTime2); // Add new item
    saveItems(); // Save after adding a new item
    input.value = "";
  } else if (input.value == "") {
    alert("Didn't add a new row because the input field was empty");
  }
}

button.addEventListener("click", btnFunction);

bodyEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btnFunction();
  }
});
