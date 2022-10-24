// Returning the first element that matches selector.
const addBtn = document.querySelector(".Add");
const removeBtn = document.querySelector(".Delete");
const modalCont = document.querySelector(".MainArea");
const textArea = document.querySelector(".TypingArea");
const mainCont = document.querySelector(".main-cont");
const allPriorityColors = document.querySelectorAll(".PriorityColor");
const addTodoCont = document.querySelectorAll(".AddTodo>*");
let uid = new ShortUniqueId();
let ticketsArr = [];

// Colors array.
const colors = ["Pink", "Green", "Blue", "Black"];
let modalPriorityColor = colors[colors.length-1];

var isModalPresent = false;
addBtn.addEventListener("click", function() {
   if(!isModalPresent)  {
    // Display Modal.
    modalCont.style.display = "flex";
   }
   if(isModalPresent) {
    // Hide Modal.
    modalCont.style.display = "none";
   }
   isModalPresent = !isModalPresent;
});

removeBtn.addEventListener("click", function() {
   if(!isModalPresent)  {
    // Display Modal.
    modalCont.style.display = "flex";
   }
   if(isModalPresent) {
    // Hide Modal.
    modalCont.style.display = "none";
   }
   isModalPresent = !isModalPresent;
});

// Hovering on AddTodo.
// *******************

// Dynamically viewing inner ticket.
modalCont.addEventListener("keydown", function(event) {
   if(event.shiftKey && event.key == "Enter") {
      // Calling createTicket()
      createTicket(modalPriorityColor, textArea.value);
      // Altering display and updating modal status.
      modalCont.style.display = "none";
      isModalPresent = false;
      textArea.value = "";
      allPriorityColors.forEach( colorElement => {
         colorElement.classList.remove("active");
      });
      document.querySelector(".MarkingArea .Black").classList.add("active");
      modalPriorityColor = "Black";
   }
});

function createTicket(ticketColor, data, ticketID) {
   // Generating short unique id using npm package.
   let id = ticketID || uid();
   let ticketCont = document.createElement("div");
   ticketCont.setAttribute("class", "ticket-cont");
   ticketCont.innerHTML = `
      <div class="ticket-color ${ticketColor}"></div>
      <div class="ticket-id">#${id}</div>
      <div class="task-area">${data}</div>
      <div class="ticket-lock">
         <i class="fa-solid fa-lock"></i>
      </div>
   `;
   mainCont.appendChild(ticketCont);
   
   // If ticket is being generated for the first time, save it in local storage.
   if(!ticketID) {
      ticketsArr.push({
         ticketID: id,
         ticketColor,
         ticketTask: data
      });
      localStorage.setItem("tickets", JSON.stringify(ticketsArr));
   }
}
// Getting data from local storage for re-rendering of tickets.
if(localStorage.getItem("tickets")) {
   ticketsArr = JSON.parse(localStorage.getItem("tickets"));
   ticketsArr.forEach(ticketObj => {
      createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
   });
}

allPriorityColors.forEach(colorElement => {
   colorElement.addEventListener("click", function() {
      allPriorityColors.forEach( colorElement => {
         colorElement.classList.remove("active");
      });
      colorElement.classList.add("active");
      modalPriorityColor = colorElement.classList[0];
   });
});

// Getting ticket on the basis of ticket color.
addTodoCont.forEach(toolBoxColor => {
   toolBoxColor.addEventListener("click", function() {
      let currColor = this.classList[0];
      console.log(currColor);
   });
});