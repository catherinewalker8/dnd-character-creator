var newItem = document.getElementById("newItem");

var saveButton = document.getElementById("saveButton");

var nothingToDo = document.getElementById("nothingToDo");

var itemsArea = document.getElementById("items");

var newItemButton = document.getElementById("newItemButton");

var modalInput = document.querySelector("input");

var modalTitle = document.querySelector(".modal-title");

var rowBeingEdited = null;



itemsArea.addEventListener("click", onClickListButton);

saveButton.addEventListener("click", onClickSaveButton);

newItemButton.addEventListener("click", onClickNewItemButton);



function onClickNewItemButton(){
    modalTitle.textContent = "New item";
    modalInput.value = null;
}


function onClickSaveButton() {
        
        var newItemValue = newItem.value;

        if (newItemValue.trim() == ""){
            newItem.value = null;
            return;
        } 

        if (rowBeingEdited != null){
            rowBeingEdited.cells[1].innerText = newItemValue;
            rowBeingEdited = null;
        }

        else{
        
        var itemsArea = document.getElementById("items");
        var newTr = document.createElement("tr");
        newTr.innerHTML = 
                `<td><button class="done"></button></td>
                <td>${newItemValue}</td>
                <td><button class="edit" data-bs-toggle="modal" 
                data-bs-target="#newItemModal"></button></td>
                <td><button class="bin"></button></td>`;
        itemsArea.appendChild(newTr);
        }

        newItem.value = null;
        modalInput.value = null;
        modalTitle.textContent = "New item";
        nothingToDo.style.display = "none";
}



function onClickListButton(e){

    if (e.target.classList.contains("done")) {
        e.target.classList.toggle("complete");
    }
    else if (e.target.classList.contains("bin")) {
        var row = e.target.closest("tr");
        row.remove();
    }

    // Editing rows using the prompt box method:

    // else if (e.target.classList.contains("edit")){
    //     var row = e.target.closest("tr");
    //     var cell = row.cells[1];
    //     var updatedItem = prompt("Edit your task: ", cell.innerText);
    // if (updatedItem != null && updatedItem.trim() != "") {
    //     cell.innerText = updatedItem;
    // }
    // }

    //Editing rows using the modal I created earlier

    else if (e.target.classList.contains("edit")){
        rowBeingEdited = e.target.closest("tr");
            modalTitle.textContent = "Edit item";
            var cell = rowBeingEdited.cells[1].innerText;
            modalInput.value = cell;

    }

    if (itemsArea.children.length === 0) {
        nothingToDo.style.display = "block";
    }
}