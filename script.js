const thead = document.querySelector("#table-heading-row");
const tbody = document.querySelector("#table-body");
const columns = 26;
const rows = 100;

let currCell;
let cutValue = {};

const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const leftAlign = document.getElementById("left-align");
const rightAlign = document.getElementById("right-align");
const centerAlign = document.getElementById("center-align");

const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

const borderBottom = document.querySelector("#border-btm");
const borderTop = document.querySelector("#border-top");
const borderLeft = document.querySelector("#border-left");
const borderRight = document.querySelector("#border-right");
const borderOuter = document.querySelector("#border-outer");

let matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(columns);
  for (let j = 0; j < columns; j++) {
    matrix[i][j] = {};
  }
}

for (let i = 0; i < columns; i++) {
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(65 + i);
  thead.appendChild(th);
}

for (let i = 0; i < rows; i++) {
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = i + 1;
  tr.appendChild(th);

  for (let j = 0; j < columns; j++) {
    let td = document.createElement("td");
    td.setAttribute("contenteditable", "true");
    td.setAttribute("onfocus", "onFocusFnc(event)");
    td.setAttribute("oninput", "onFocusFnc(event)");
    td.setAttribute("spellcheck", "false");
    td.setAttribute("id", `${String.fromCharCode(65 + j)}${i + 1}`);
    td.addEventListener("focus", (event) => onFocusFnc(event));
    tr.appendChild(td);
  }
  //append the row into the body
  tbody.appendChild(tr);
}

function onFocusFnc(event) {
  currCell = event.target;
  document.getElementById("current-cell").innerText = event.target.id;
  updateJson(currCell);
}
function updateJson(cell) {
  var json = {
    text: cell.innerText,
    style: cell.style.cssText,
    id: cell.getAttribute("id"),
  };
  // update this json in my matrix
  var id = cell.id.split(""); //A1,A2,A3,A4

  var i = id[1] - 1;
  var j = id[0].charCodeAt(0) - 65;

  matrix[i][j] = json;
  console.log(matrix);
}

function downloadJson() {
  // Convert JSON data to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);

        jsonData.forEach((row) => {
          row.forEach((col) => {
            if (col.id) {
              var myCell = document.getElementById(`${col.id}`);
              myCell.innerText = col.text;
              myCell.style.cssText = col.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  }
}

// event listeners for text bold, italic, underline
boldBtn.addEventListener("click", () => {
  if (currCell.style.fontWeight == "bold") {
    currCell.style.fontWeight = "normal";
  } else {
    currCell.style.fontWeight = "bold";
  }
  updateJson(currCell);
});

italicsBtn.addEventListener("click", () => {
  if (currCell.style.fontStyle == "italic") {
    currCell.style.fontStyle = "normal";
  } else {
    currCell.style.fontStyle = "italic";
  }
  updateJson(currCell);
});

underlineBtn.addEventListener("click", () => {
  if (currCell.style.textDecoration == "underline") {
    currCell.style.textDecoration = null;
  } else {
    currCell.style.textDecoration = "underline";
  }
  updateJson(currCell);
});

bgColor.addEventListener("input", () => {
  currCell.style.backgroundColor = bgColor.value;
  updateJson(currCell);
});

textColor.addEventListener("input", () => {
  currCell.style.color = textColor.value;
  updateJson(currCell);
});

leftAlign.addEventListener("click", () => {
  currCell.style.textAlign = "left";
  updateJson(currCell);
});

rightAlign.addEventListener("click", () => {
  currCell.style.textAlign = "right";
  updateJson(currCell);
});
centerAlign.addEventListener("click", () => {
  currCell.style.textAlign = "center";
  updateJson(currCell);
});
fontSize.addEventListener("change", () => {
  currCell.style.fontSize = fontSize.value;
  updateJson(currCell);
});
fontFamily.addEventListener("change", () => {
  currCell.style.fontFamily = fontFamily.value;
  updateJson(currCell);
});

cutBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  currCell.style = null;
  currCell.innerText = null;
  updateJson(currCell);
});

copyBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  updateJson(currCell);
});

pasteBtn.addEventListener("click", () => {
  currCell.style.cssText = cutValue.style;
  currCell.innerText = cutValue.text;
  updateJson(currCell);
});

borderBottom.addEventListener("click", () => {
  if (currCell.style.borderBottom == "2px solid black") {
    currCell.style.borderBottom = "1px solid lightgray";
  } else {
    currCell.style.borderBottom = "2px solid black";
  }
  updateJson(currCell);
});

borderTop.addEventListener("click", () => {
  if (currCell.style.borderTop == "2px solid black") {
    currCell.style.borderTop = "1px solid lightgray";
  } else {
    currCell.style.borderTop = "2px solid black";
  }
  updateJson(currCell);
});

borderLeft.addEventListener("click", () => {
  if (currCell.style.borderLeft == "2px solid black") {
    currCell.style.borderLeft = "1px solid lightgray";
  } else {
    currCell.style.borderLeft = "2px solid black";
  }
  updateJson(currCell);
});

borderRight.addEventListener("click", () => {
  if (currCell.style.borderRight == "2px solid black") {
    currCell.style.borderRight = "1px solid lightgray";
  } else {
    currCell.style.borderRight = "2px solid black";
  }
  updateJson(currCell);
});

borderOuter.addEventListener("click", () => {
  if (currCell.style.border == "2px solid black") {
    currCell.style.border = "1px solid lightgray";
  } else {
    currCell.style.border = "2px solid black";
  }
  updateJson(currCell);
});
