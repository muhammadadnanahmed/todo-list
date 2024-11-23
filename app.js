// Data structure now includes timestamps
var data = [
  { text: "list1", timestamp: new Date().toLocaleString() },
  { text: "list2", timestamp: new Date().toLocaleString() },
];

var boxDiv = document.querySelector(".box");

function submitInput(e) {
  e.preventDefault();
  var inp = document.getElementById("input-text");
  if (inp.value.trim() === "") return; // Prevent empty submissions

  // Add new item with timestamp
  data.push({ text: inp.value, timestamp: new Date().toLocaleString() });
  inp.value = ""; // Clear input
  renderData();
}

function renderData() {
  boxDiv.innerHTML = "";
  if (data.length === 0) {
    boxDiv.innerHTML = "<p>No items in the list. Add one!</p>";
    return;
  }

  data.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-item";
    itemDiv.innerHTML = `
      <p id="${index}">${item.text}</p>
      <span class="timestamp">Added/Updated: ${item.timestamp}</span>
      <input type="text" value="${item.text}" class="inpEdit" style="display: none;" />
      <button onClick="editItem(event)">Edit</button>
      <button onClick="deleteItem(${index})">Delete</button>
    `;
    boxDiv.appendChild(itemDiv);
  });
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    data.splice(index, 1);
    renderData();
  }
}

function saveEdit(index, newValue) {
  // Update text and timestamp
  data[index] = { text: newValue, timestamp: new Date().toLocaleString() };
  renderData();
}

function editItem(e) {
  const listItem = e.target.parentElement;
  const id = listItem.querySelector("p").id;
  const inpEdit = listItem.querySelector(".inpEdit");
  if (e.target.innerText === "Edit") {
    inpEdit.style.display = "block";
    listItem.querySelector("p").style.display = "none";
    e.target.innerText = "Save";
  } else {
    saveEdit(id, inpEdit.value);
    e.target.innerText = "Edit";
  }
}

renderData();
