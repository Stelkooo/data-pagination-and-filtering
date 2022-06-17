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
           <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
           <h3>${data[i].name.first} ${data[i].name.last}</h3>
           <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${data[i].registered.date}</span>
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
   console.log(list.length);
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

// Call functions
showPage(data, 1);
addPagination(data);