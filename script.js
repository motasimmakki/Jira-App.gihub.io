// Returning the first element that matches selector.
const addBtn = document.querySelector(".Add");
const removeBtn = document.querySelector(".Delete");
const modalCont = document.querySelector(".MainArea");
const textArea = document.querySelector(".TypingArea");
const mainCont = document.querySelector(".main-cont");

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
   if(event.key == "Shift") {
      // Calling createTicket()
      createTicket(modalPriorityColor, textArea.value);
      // Altering display and updating modal status.
      modalCont.style.display = "none";
      isModalPresent = false;
      textArea.value = "";
   }
});

function createTicket(ticketColor, data) {
   // Generating short unique id npm package.
   let id = new ShortUniqueId();
   let ticketCont = document.createElement("div");
   ticketCont.setAttribute("class", "ticket-cont");
   ticketCont.innerHTML = `
      <div class="ticket-color ${ticketColor}"></div>
      <div class="ticket-id">#${id()}</div>
      <div class="task-area">${data}</div>
      <div class="ticket-lock">
         <i class="fa-solid fa-lock"></i>
      </div>
   `;
   mainCont.appendChild(ticketCont);
}