/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let itemsPerPage = 8;
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;

   let ul = document.getElementsByClassName("student-list")[0];
   ul.innerHTML = "";

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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let numOfPaginationBtns = Math.round(list.length / 9);
   
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
         showPage(data, e.target.innerHTML);
      }
   });
}

function addSearchComp() {
   let header = document.getElementsByClassName("header")[0];
   let searchCompHTML = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
   header.insertAdjacentHTML("beforeend", searchCompHTML);

   let searchInput = document.getElementById("search");
   let searchBtn = document.querySelector(".student-search button");
   searchBtn.addEventListener("click", (e) => {
      let searchInputValue = searchInput.value.toLowerCase();
      let searchData = data.filter(function (value, index, array) {
         let studentFirst = value.name.first.toLowerCase();
         let studentLast = value.name.last.toLowerCase();
         return ((studentFirst.includes(searchInputValue)) || (studentLast.includes(searchInputValue)));
      });
      showPage(searchData, 1);
   })
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchComp();