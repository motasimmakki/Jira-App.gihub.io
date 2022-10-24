// Returning the first element that matches selector.
const addBtn = document.querySelector(".Add");
const removeBtn = document.querySelector(".Delete i");
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

var isRemoveBtnActive = false;
removeBtn.addEventListener("click", function() {
   // Make it active if inactive (By making it red)
   if(!isRemoveBtnActive)  {
    // Display Modal.
      removeBtn.style.color = "red";
   }
   // Deactivate it.
   if(isRemoveBtnActive) {
      removeBtn.style.color = "white";
   }
   isRemoveBtnActive = !isRemoveBtnActive;
});

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

   handleRemoval(ticketCont, id);
}
// Getting data from local storage for re-rendering of tickets.
if(localStorage.getItem("tickets")) {
   ticketsArr = JSON.parse(localStorage.getItem("tickets"));
   ticketsArr.forEach(ticketObj => {
      createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
   });
}
// console.log(localStorage.getItem("tickets"));

allPriorityColors.forEach(colorElement => {
   colorElement.addEventListener("click", function() {
      allPriorityColors.forEach( colorElement => {
         colorElement.classList.remove("active");
      });
      colorElement.classList.add("active");
      modalPriorityColor = colorElement.classList[0];
   });
});

// Hovering on AddTodo.
// Getting ticket on the basis of ticket color.
addTodoCont.forEach(toolBoxColor => {
   toolBoxColor.addEventListener("click", function() {
      let currColor = this.classList[0];
      // console.log(currColor);
      let filteredTicket = ticketsArr.filter((currTicket) => {
         return (currTicket.ticketColor == currColor);
      });
      // console.log(filteredTicket);
      // Hiding all tickets.
      let allTickets = document.querySelectorAll(".ticket-cont");
      allTickets.forEach(ticketObj => ticketObj.remove());

      // Displaying only filtered tickets.
      filteredTicket.forEach(ticketObj => {
         createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
      });
   });
   
   // Displaying all tickets on double click.
   toolBoxColor.addEventListener("dblclick", function() {
      // Removes tickets of current color.
      let allTickets = document.querySelectorAll(".ticket-cont");
      allTickets.forEach(ticketObj => ticketObj.remove());

      // Display tickets of all color.
      ticketsArr.forEach(ticketObj => {
         createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
      });
   });
});

// Remove ticket if remove button is active.
function handleRemoval(ticketCont, id) {
   ticketCont.addEventListener("click", function(){
      if(!isRemoveBtnActive) return;
      // Remove from tickets array.
      let idx = getTicketIndex(id);
      // console.log(idx);
      ticketsArr.splice(idx, 1);
      // Set in local storage.
      localStorage.setItem("tickets", JSON.stringify(ticketsArr));
      
      // Remove from frontend.
      // Removing all tickets.
      let allTickets = document.querySelectorAll(".ticket-cont");
      allTickets.forEach(ticketObj => ticketObj.remove());
      // Displaying only the current present tickets.
      let availableTickets = JSON.parse(localStorage.getItem("tickets"))
      // console.log(availableTickets);
      availableTickets.forEach(ticketObj => {
         createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
      })
   });
}


function getTicketIndex(id) {
   let ticketToDelete;
   ticketsArr.forEach(ticketObj => {
      if(ticketObj.ticketID == id) {
         ticketToDelete = ticketObj;
         return;
      }
   });
   return ticketsArr.indexOf(ticketToDelete);
}
