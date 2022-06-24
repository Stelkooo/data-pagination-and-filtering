/*
   showPage function
   [array]list - array of students
   [number]page - which page number to display
   displays the students on the page depending which page no was selected
   will display an error if no students were passed
*/
function showPage(list, page) {
   let itemsPerPage = 9;
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = (page * itemsPerPage) - 1;

   let ul = document.getElementsByClassName("student-list")[0];
   ul.innerHTML = "";

   if (list.length === 0) {
      ul.insertAdjacentHTML("beforeend", "<h2>No students found</h2>");
   } else {
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i <= endIndex) {
            ul.insertAdjacentHTML("beforeend", `<li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
              <h3>${list[i].name.first} ${list[i].name.last}</h3>
              <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${list[i].registered.date}</span>
            </div>
          </li>`);
         }
      }
   }
}

/*
   addPagination function
   [array]list - array of students
   checks how many students were passed
   will create and insert/remove page buttons depending on the list length
*/
function addPagination(list) {
   numOfPaginationBtns = Math.ceil(list.length / 9);

   let ul = document.getElementsByClassName("link-list")[0];
   ul.innerHTML = "";

   for (let i = 1; i < numOfPaginationBtns + 1; i++) {
      if (i === 1) {
         ul.insertAdjacentHTML("beforeend", `<li>
      <button type="button" class="active">${i}</button>
    </li>`);
      } else {
         ul.insertAdjacentHTML("beforeend", `<li>
      <button type="button">${i}</button>
    </li>`);
      }
   }

   ul.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         for (let i = 0; i < ul.children.length; i++) {
            let paginationBtn = ul.children[i].children[0];
            if (paginationBtn.className === "active") {
               paginationBtn.className = "";
            }
         }
         e.target.className = "active";
         showPage(list, e.target.innerHTML);
      }
   });
}

/*
   addSearchComp function
   takes no params
   creates the search bar in the header
   depending on the search it will keep/remove students from the data array
   can be triggered through keyup and clicking on the search btn
*/
function addSearchComp() {

   function updateStudentList() {

      let searchInputValue = searchInput.value.toLowerCase();
      let searchData = data.filter(function (value, index, array) {
         let studentFirst = value.name.first.toLowerCase();
         let studentLast = value.name.last.toLowerCase();
         return ((studentFirst.includes(searchInputValue)) || (studentLast.includes(searchInputValue)));
      });
      showPage(searchData, 1);
      addPagination(searchData);
   }

   let header = document.getElementsByClassName("header")[0];
   let searchCompHTML = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
   header.insertAdjacentHTML("beforeend", searchCompHTML);

   let searchInput = document.getElementById("search");
   let searchBtn = document.querySelector(".student-search button");

   searchBtn.addEventListener("click", updateStudentList);

   searchInput.addEventListener("keyup", updateStudentList);
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchComp();