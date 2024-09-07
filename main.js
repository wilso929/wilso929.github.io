const charName = document.getElementById("name");
const charRoll = document.getElementById("roll");
const addChar = document.getElementById("add-char");
const charList = document.getElementById("char-list");
const inputForm = document.getElementById("input-form");
const clearBtn = document.getElementById("clear-btn");

const closeSpell = document.getElementById("close-spell");
const closeCustom = document.getElementById("close-custom");

const concentrationForm = document.getElementById("concentration-form");
const customForm = document.getElementById("custom-form");
const concentrationSpell = document.getElementById("spell");
const customStatus = document.getElementById("custom-status");

const charData = JSON.parse(localStorage.getItem("data")) || [];
const charCopyList = document.getElementById("copy-list");
const currentChar = {};


const addOrUpdateCharList = () => {
    const dataArrIndex = charData.findIndex((char) => char.id === currentChar.id);
    const charObj = {
        id: `${charName.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        name: charName.value,
        roll: charRoll.value,
        status: [],
        damage: 0
    };

    if (dataArrIndex === -1) {
        charData.unshift(charObj);
    } else {
         charData[dataArrIndex] = charObj;
    }

    localStorage.setItem("data", JSON.stringify(charData));
    update();
    reset();
}

const updateCopyList= () => {
    let list = "";
    charData.forEach(
      ({ name }) => {
          list += name + " - ";
      }
    );
    list = list.slice(0, -3);
    charCopyList.innerText = list;
  };

const fillStatusList = () => {
    const lists = document.getElementsByClassName("status-list");
    Array.from(lists).forEach( (list) => {
        const dataArrIndex = charData.findIndex(
            (char) => char.id === list.parentElement.parentElement.id
        );

        charData[dataArrIndex].status.forEach((status) => {
            list.innerHTML += `<div onclick="deleteStatus(this)" class="status-card">${status}</div>`
        });
    });
}

const updateCharContainer = () => {
    charList.innerHTML = "";
    charData.forEach(
      ({ id, name, roll, damage}) => {
          (charList.innerHTML += `
          <div class="char" id="${id}">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Roll:</strong> ${roll}</p>
            <div class="status-container" id="stat-${id}">
            <select name="status" class="status">
                <option value="">--Status--</option>
                <option value="Blinded">Blinded</option>
                <option value="Charmed">Charmed</option>
                <option value="Deafened">Deafened</option>
                <option value="Frightened">Frightened</option>
                <option value="Grappled">Grappled</option>
                <option value="Incapacitated">Incapacitated</option>
                <option value="Invisible">Invisible</option>
                <option value="Paralyzed">Paralyzed</option>
                <option value="Petrified">Petrified</option>
                <option value="Poisoned">Poisoned</option>
                <option value="Prone">Prone</option>
                <option value="Restrained">Restrained</option>
                <option value="Stunned">Stunned</option>
                <option value="Unconscious">Unconscious</option>
                <option value="Concentration">Concentration</option>
                <option value="Custom">Custom</option>
            </select>
            <button class="status-btn" onclick="select(this)" type="button">Add Status</button>
            <div class="status-list"></div>
            </div>
            <input class="damage-input" type="number" id="damage-${id}" value="${damage}" onchange="saveDamage(this)" onblur="saveDamage(this)">
            <button class="btn" onclick="deleteChar(this)" type="button" class="btn">Delete</button> 
          </div>
        `)

      }
    );
  };

  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)


  const saveDamage  = (damEl) => {
    const charEl = damEl.parentElement;
    const dataArrIndex = charData.findIndex(
        (char) => char.id === charEl.id
    );
    const damage = damEl.value;
    if(isNumeric(damage)){
        charData[dataArrIndex].damage = damEl.value;
        localStorage.setItem("data", JSON.stringify(charData));
    }
}

const deleteChar = (buttonEl) => {
    const dataArrIndex = charData.findIndex(
        (char) => char.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove();
    charData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(charData));
    update();
}

const deleteStatus = (statEl) => {
    const charEl = statEl.parentElement.parentElement.parentElement;
    const status = statEl.innerText;
    const dataArrIndex = charData.findIndex(
        (char) => char.id === charEl.id
    );

    const statusIndex = charData[dataArrIndex].status.findIndex(
        (stat) => stat === status
    );

    charData[dataArrIndex].status.splice(statusIndex, 1);
    statEl.remove();
    localStorage.setItem("data", JSON.stringify(charData));
}

const addConcentration = (parentEl, parentID)  => {
    const cardText = "Concentration: "+concentrationSpell.value;

    const dataArrIndex = charData.findIndex(
        (char) => char.id === parentID
    );
    if(!charData[dataArrIndex].status.includes(cardText)){
        charData[dataArrIndex].status.push(cardText)
        parentEl.children[2].innerHTML += `<div onclick="deleteStatus(this)" class="status-card">${cardText}</div>`;
        localStorage.setItem("data", JSON.stringify(charData));
    }
    concentrationForm.style.display = "none";
    update();
}


const addCustom = (parentEl, parentID)  => {
    const value = customStatus.value;

    const dataArrIndex = charData.findIndex(
        (char) => char.id === parentID
    );

    if(!charData[dataArrIndex].status.includes(value)){
        charData[dataArrIndex].status.push(value)
        parentEl.children[2].innerHTML += `<div onclick="deleteStatus(this)" class="status-card">${value}</div>`;
        localStorage.setItem("data", JSON.stringify(charData));
    }
    customForm.style.display = "none";
    update();
}

const select = (buttonEl) => {
    const selectedStatus = buttonEl.parentElement.children[0].value;
    const parentEl = buttonEl.parentElement;
    const parentID = buttonEl.parentElement.parentElement.id;

    switch (selectedStatus) {
        case "Concentration":
            concentrationSpell.value = "";
            concentrationForm.addEventListener("submit", (e) => {
                e.preventDefault();
                addConcentration(parentEl, parentID);
            });
            concentrationForm.style.display = "flex";
            
            concentrationForm.removeEventListener("submit", (e) => {
                e.preventDefault();
                addConcentration(parentEl, parentID);
            });
            break;
        case "Custom":
            customStatus.value = "";
            customForm.addEventListener("submit", (e) => {
                e.preventDefault();
                addCustom(parentEl, parentID);
            });
            customForm.style.display = "flex";
            break;
        case null:
            break;
        case "":
            break;
        default:
            const dataArrIndex = charData.findIndex(
                (char) => char.id === parentID
            );
            if(!charData[dataArrIndex].status.includes(selectedStatus)){
                charData[dataArrIndex].status.push(selectedStatus)
                buttonEl.parentElement.children[2].innerHTML += `<div onclick="deleteStatus(this)" class="status-card">${selectedStatus}</div>`;
                localStorage.setItem("data", JSON.stringify(charData));
            }
            break;
    }
}
  

const reset = () => {
    charName.value = "";
    charRoll.value = "";
}


const sortCharList = () => {
    charData.sort(function(a, b) { 
        return Number(b.roll) - Number(a.roll);
    })
}

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateCharList();
});



clearBtn.addEventListener("click", () => {
    localStorage.clear();
    charData.splice(0, charData.length);
    localStorage.setItem("data", JSON.stringify(charData));
    update();
    reset()
});


closeCustom.addEventListener("click", () => {
    customStatus.value = "";
    customForm.style.display = "none";
});

closeSpell.addEventListener("click", () => {
    concentrationSpell.value = "";
    concentrationForm.style.display = "none";
});

const update = () =>{
    sortCharList();
    updateCharContainer()
    updateCopyList();
    fillStatusList();
}


if (charData.length) {
    update();
}