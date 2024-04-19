var jsonData = [
  {
    Name: "Fenil ",
    Surname: "Patel",
    Gender: "Male",
  },
  {
    Name: "Meet ",
    Surname: "Joshi",
    Gender: "Male",
  },
  {
    Name: "Hardik ",
    Surname: "Suthar",
    Gender: "Male",
  },
  {
    Name: "Chirag ",
    Surname: "Gohil",
    Gender: "Male",
  },
  {
    Name: "Hetvi ",
    Surname: "Gohil",
    Gender: "Female",
  },
  {
    Name: "Rahul ",
    Surname: "Patel",
    Gender: "Male",
  },
  {
    Name: "Ritu ",
    Surname: "Joshi",
    Gender: "Female",
  },
  {
    Name: "Aditi ",
    Surname: "Suthar",
    Gender: "Female",
  },
  {
    Name: "Chirag ",
    Surname: "Gohil",
    Gender: "Male",
  },
  {
    Name: "Hetal ",
    Surname: "Gohil",
    Gender: "Female",
  },
  {
    Name: "Prince ",
    Surname: "Patel",
    Gender: "Male",
  },
  {
    Name: "Amit ",
    Surname: "Joshi",
    Gender: "Male",
  },
  {
    Name: "Hetam ",
    Surname: "kevadiya",
    Gender: "Female",
  },
  {
    Name: "Chirag ",
    Surname: "Gohil",
    Gender: "Male",
  },
  {
    Name: "Hetvi ",
    Surname: "Gohil",
    Gender: "Female",
  },
];

var rowsPerPage = 5;
var currentPage = 1;

// Define a function to display data for the current page
function displayDataForPage(pageNumber) {
  var startIndex = (pageNumber - 1) * rowsPerPage;

  console.log("rowsPerPage", rowsPerPage);
  var endIndex = startIndex + rowsPerPage;
  var dataForPage = jsonData.slice(startIndex, endIndex);
  console.log("dataForPage", dataForPage);
  printHTMLJson(dataForPage);
}

// Update the event listeners for previous and next page buttons
document.getElementById("previousPage").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    displayDataForPage(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  var totalPages = Math.ceil(jsonData.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayDataForPage(currentPage);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  displayDataForPage(currentPage);
  printHTMLJson(jsonData);

  //close pop-up form
  document.getElementById("close").addEventListener("click", function () {
    console.log("Closing...");

    document.getElementById("change").style.display = "none";
  });
});

//search

function myFunction() {
  var input, filter, data;
  input = document.getElementById("searchInput");
  console.log("input", input);
  filter = input.value.trim().toUpperCase();
  if (filter !== "") {
    data = jsonData.filter(function (item) {
      return item.Name && item.Name.toUpperCase().indexOf(filter) !== -1;
    });
  } else {
    data = jsonData;
  }
  printHTMLJson(data);
  // for (i = 0; i < jsonData.length; i++) {

  //   if (jsonData[i].Name.toUpperCase().indexOf(filter) > -1
  //    ||
  //       jsonData[i].Surname.toUpperCase().indexOf(filter) > -1
  //       ||
  //       jsonData[i].Gender.toUpperCase().indexOf(filter) > -1
  //       ) {

  //     tr[i].style.display = "";
  //   } else {

  //     tr[i].style.display = "none";
  //   }
  // }

  for (i = 0; i < jsonData.length; i++) {
    for (j = 0; j < tr.length; j++) {
      td = tr[i].getElementsByTagName("td")[0];

      if (td) {
        txtValue = td.textContent || td.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

function handleSubmit() {
  // e.preventDefault();
  let gender = document.querySelector(
    'input[name="flexRadioDefault"]:checked'
  ).value;

  nameV = document.getElementById("name").value;
  surname = document.getElementById("surname").value;

  let selectedIndex = document.querySelector("#pr tr.selected").rowIndex;

  // Update the corresponding object in jsonData
  jsonData[selectedIndex - 1].Gender = gender;
  jsonData[selectedIndex - 1].Name = nameV;
  jsonData[selectedIndex - 1].Surname = surname;

  // jsonData[1].Gender = gender;
  // jsonData[1].Name = nameV;
  // jsonData[1].Surname = surname;

  document.getElementById("change").style.display = "none";
  printHTMLJson(jsonData);
}

function printHTMLJson(latestdata) {
  var content = document.getElementById("pr");

  content.innerHTML = "";

  //create table to json data
  let data = 5;
  for (let i = 0; i < data; i++) {
    let item = latestdata[i];
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    nameCell.textContent = item.Name;
    row.appendChild(nameCell);

    var surnameCell = document.createElement("td");
    surnameCell.textContent = item.Surname;
    row.appendChild(surnameCell);

    var genderCell = document.createElement("td");
    genderCell.textContent = item.Gender;
    row.appendChild(genderCell);

    var actionCell = document.createElement("td");
    var button = document.createElement("button");
    button.textContent = "Edit";
    button.classList.add("btn", "btn-info");
    button.addEventListener("click", function () {
      console.log("item", item);

      document.querySelectorAll("#pr tr.selected").forEach(function (row) {
        row.classList.remove("selected");
      });

      // Add the "selected" class to the current row
      var selectRow = this.parentElement.parentElement;
      selectRow.classList.add("selected");

      //data populate in form
      var selectRow = this.parentElement.parentElement;
      document.getElementById("name").value =
        selectRow.cells[0].textContent.trim();
      document.getElementById("surname").value =
        selectRow.cells[1].textContent.trim();

      var genderValue = selectRow.cells[2].textContent.trim();

      document.getElementById(
        genderValue === "Male" ? "flexRadioDefault1" : "flexRadioDefault2"
      ).checked = true;

      document.getElementById("change").style.display = "block";

      console.log("editng...");
    });

    var space = document.createTextNode("\u00A0");

    var button1 = document.createElement("button");
    button1.textContent = "Delete";
    button1.classList.add("btn", "btn-danger");
    button1.addEventListener("click", function () {
      console.log("deleting...");

      document.getElementById("change").style.display = "none";
      var tr = this.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
    });

    actionCell.appendChild(button);
    actionCell.appendChild(space);
    actionCell.appendChild(button1);
    row.appendChild(actionCell);

    content.appendChild(row);
  }
}
myFunction;

// function onchangeFunction(e){
//   var input = document.getElementById("searchInput").value;
//   console.log("Typed value:", input);
// }
