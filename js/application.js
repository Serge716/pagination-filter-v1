var allStudents = document.querySelectorAll(".student-item");
var studentsList = allStudents;
var mainDiv = document.getElementsByTagName("div")[0];
var studentsPerPage = 10;
var numberOfPages = Math.ceil(allStudents.length / studentsPerPage);
var header = document.querySelector(".page-header");
var searchButton;
var searchInput;

//Create a list items for the pages numbers
var addPages = function() {
  //Create new div
  var div = document.createElement("div");
  //Add .pagination to div
  div.classList.add("pagination")
  //Create ul
  var ul = document.createElement("ul");

  for (var i = 1; i <= numberOfPages; i += 1) {
    //Create list item
    var li = document.createElement("li");
    //Create anchor
    var anchor = document.createElement("a");
    anchor.href = "#";
    anchor.innerText = i;
    li.appendChild(anchor);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  mainDiv.appendChild(div);
}

var hideStudents = function() {
  for (var i = 0; i < allStudents.length; i += 1) {
    allStudents[i].hidden = true;
  }
}

var displayStudents = function(students) {
  var activePage = document.getElementsByTagName("a")[0]
  activePage.classList.add("active");
  for (var i = studentsPerPage; i < students.length; i += 1) {
    students[i].hidden = true;
  }

  pageButtons = document.querySelectorAll("a");
  for (var i = 0; i < pageButtons.length; i += 1) {
    pageButtons[i].addEventListener("click", selectPage(i));
  }
}

function selectPage(index) {
  return function() {
    hideStudents();
    var select = pageButtons[index];
    var pageNumber = select.innerText - 1
    
    for (var i = 0; i < pageButtons.length; i += 1) {
      pageButtons[i].classList.remove("active");
    }
    select.classList.add("active");

    if ( pageNumber == index ) {
      var startAt = index * 10;
      var endAt = startAt + 9;
      
      displayTenStudents(startAt, endAt);
    }
  }
}

//Display 10 students per page
var displayTenStudents = function(start, end) {
  for (var i = start; i <= end; i += 1) {
    if (i < allStudents.length) {
      allStudents[i].hidden = false;
    } else {
      break;
    }
    
  }
}

//Add Search Buttons
var addSearchButton = function() {
  //Add div .student-search
  var addDiv = document.createElement("div");
  addDiv.classList.add("student-search");
  //Add input placeholder "Search for students..."
  var addInput = document.createElement("input");
  addInput.placeholder = "Search for students...";
  //Add button innerText "Search"
  var addButton = document.createElement("button");
  addButton.innerText = "Search";
  addDiv.appendChild(addInput);
  addDiv.appendChild(addButton);
  header.appendChild(addDiv);
  searchButton = header.querySelector("button");
  searchInput = header.querySelector("input");
}

var searchForStudents = function() {
  searchButton.addEventListener("click", resetAllStudents());
  //Hide all students
  hideStudents();
  //var mainDiv;
  var collectStudents = [];
  var studentsFound = 0;
  var getInputValue = document.getElementsByTagName("input")[0];
  var mainDiv = document.querySelector(".page");
  var noMatch = document.querySelector("h2");
  //Cycle through all students and if they match the input value show
  for (var i = 0; i < allStudents.length; i += 1) {
    console.log(allStudents.innerText);

    if ( allStudents[i].innerText.toLowerCase().indexOf(getInputValue.value.toLowerCase()) > -1 ) {
      // mainDiv = document.querySelector(".page");
      for (var j = 0; j < allStudents.length; j += 1) {
        allStudents[i].hidden = false;
      }
      studentsFound += 1;
      collectStudents.push(allStudents[i]);
    }
  }
  mainDiv.removeChild(mainDiv.lastChild); 
  console.log(collectStudents.length);
  if (collectStudents.length > 0) {
    numberOfPages = Math.ceil(collectStudents.length / studentsPerPage)
    // mainDiv.removeChild(mainDiv.lastChild); 
    addPages();

    allStudents = collectStudents;
    displayStudents(allStudents);
  } else {
    noMatch.innerText = "No Matches";
  }
}

var resetAllStudents = function() {
  return allStudents = studentsList;
}

addPages();
displayStudents(allStudents);
addSearchButton();
searchButton.addEventListener("click", searchForStudents);


// var searchForStudents = function() {
//   //Hide all students
//   hideStudents();

//   var getInputValue = document.getElementsByTagName("input")[0];
//   var collectStudents = [];
//   //Cycle through all students and if they match the input value show
//   for (var i = 0; i < allStudents.length; i += 1) {
//     console.log(allStudents.innerText);

//     if ( allStudents[i].innerText.toLowerCase().indexOf(getInputValue.value.toLowerCase()) > -1 ) {
//       for (var j = 0; j < allStudents.length; j += 1) {
//         allStudents[i].hidden = false;
//         collectStudents.push(allStudents[i]);
//       }
//     }
//     searchButton.addEventListener("click", searchForStudents);
//   }
// }