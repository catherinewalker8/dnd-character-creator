var charForm = document.getElementById('characterForm');
var saveButton = document.getElementById("saveButton");
var charactersArea = document.getElementById("characters");
var newCharacterButton = document.getElementById("newCharacterButton");

// Target ALL inputs
var charNameInput = document.getElementById("charName");
var charSpecies = document.getElementById("charSpecies");
var charClass = document.getElementById("charClass");
var charLevel = document.getElementById("charLevel");
var charHp = document.getElementById("charHp");
var charAc = document.getElementById("charAc");
var str = document.getElementById("str");
var dex = document.getElementById("dex");
var con = document.getElementById("con");
var int = document.getElementById("int");
var wis = document.getElementById("wis");
var cha = document.getElementById("cha");
var inventory = document.getElementById("inventory");
var notes = document.getElementById("notes");

var modalTitle = document.querySelector(".modal-title");
var rowBeingEdited = null;

charactersArea.addEventListener("click", onClickListButton);
saveButton.addEventListener("click", onClickSaveButton);
newCharacterButton.addEventListener("click", onClickNewCharacterButton);

function onClickNewCharacterButton(){
    modalTitle.textContent = "New Character";
    charNameInput.value = ""; charLevel.value = ""; charHp.value = ""; charAc.value = "";
    str.value = ""; dex.value = ""; con.value = ""; int.value = ""; wis.value = ""; cha.value = "";
    inventory.value = ""; notes.value = "";
}

function onClickSaveButton() {
    if (charNameInput.value.trim() == ""){ return; } 

    // Helper to build the "Big Panel" HTML
    var panelHTML = `
        <td colspan="6" class="p-4 border shadow-sm rounded mb-3 bg-light">
            <div class="row">
                <div class="col-md-6">
                    <h3>${charNameInput.value} <small class="text-muted">Lvl ${charLevel.value}</small></h3>
                    <p><strong>${charSpecies.value} ${charClass.value}</strong></p>
                </div>
                <div class="col-md-6 text-end">
                    <span class="badge bg-danger p-2">HP: ${charHp.value}</span>
                    <span class="badge bg-primary p-2">AC: ${charAc.value}</span>
                </div>
            </div>
            <hr>
            <div class="row text-center mb-3">
                <div class="col-2"><small>STR</small><div class="fw-bold">${str.value}</div></div>
                <div class="col-md-6"><strong>Notes:</strong><p class="small">${notes.value}</p></div>
            </div>
            <div class="text-end mt-2">
                <button class="edit btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#newCharacterModal">Edit Hero</button>
                <button class="bin btn btn-sm btn-danger">Delete</button>
            </div>
        </td>           <div class="col-2"><small>DEX</small><div class="fw-bold">${dex.value}</div></div>
                <div class="col-2"><small>CON</small><div class="fw-bold">${con.value}</div></div>
                <div class="col-2"><small>INT</small><div class="fw-bold">${int.value}</div></div>
                <div class="col-2"><small>WIS</small><div class="fw-bold">${wis.value}</div></div>
                <div class="col-2"><small>CHA</small><div class="fw-bold">${cha.value}</div></div>
            </div>
            <div class="row">
                <div class="col-md-6"><strong>Inventory:</strong><p class="small">${inventory.value}</p></div>
     `;

    if (rowBeingEdited != null){
        rowBeingEdited.innerHTML = panelHTML;
        saveStatsToData(rowBeingEdited); // Update the hidden data
        rowBeingEdited = null;
    }
    else {
        var newTr = document.createElement("tr");
        newTr.innerHTML = panelHTML;
        saveStatsToData(newTr); // Save the hidden data
        charactersArea.appendChild(newTr);
    }
    charNameInput.value = "";
}

// Function to store ALL hidden values so they can be re-edited
function saveStatsToData(row) {
    row.dataset.name = charNameInput.value;
    row.dataset.species = charSpecies.value;
    row.dataset.class = charClass.value;
    row.dataset.level = charLevel.value;
    row.dataset.hp = charHp.value;
    row.dataset.ac = charAc.value;
    row.dataset.str = str.value;
    row.dataset.dex = dex.value;
    row.dataset.con = con.value;
    row.dataset.int = int.value;
    row.dataset.wis = wis.value;
    row.dataset.cha = cha.value;
    row.dataset.inv = inventory.value;
    row.dataset.notes = notes.value;
}

function onClickListButton(e){
    if (e.target.classList.contains("bin")) {
        e.target.closest("tr").remove();
    }
    else if (e.target.classList.contains("edit")){
        rowBeingEdited = e.target.closest("tr");
        modalTitle.textContent = "Edit Character";
        
        // Fill modal back up from the dataset
        var d = rowBeingEdited.dataset;
        charNameInput.value = d.name;
        charSpecies.value = d.species;
        charClass.value = d.class;
        charLevel.value = d.level;
        charHp.value = d.hp;
        charAc.value = d.ac;
        str.value = d.str;
        dex.value = d.dex;
        con.value = d.con;
        int.value = d.int;
        wis.value = d.wis;
        cha.value = d.cha;
        inventory.value = d.inv;
        notes.value = d.notes;
    }
}