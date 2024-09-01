const charName = document.getElementById("name");
const charRoll = document.getElementById("roll");
const addChar = document.getElementById("add-char");
const charList = document.getElementById("char-list");
const inputForm = document.getElementById("input-form");
const clearBtn = document.getElementById("clear-btn");

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
        update();
    }
}


const deleteChar = (buttonEl) => {
    const dataArrIndex = charData.findIndex(
        (char) => char.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove();
    charData.splice(dataArrIndex, 1);
    update();
    localStorage.setItem("data", JSON.stringify(charData));
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
    update();
}

const select = (buttonEl) => {
    const selectedStatus = buttonEl.parentElement.children[0].value;
    const dataArrIndex = charData.findIndex(
        (char) => char.id === buttonEl.parentElement.parentElement.id
    );

    if(selectedStatus && !charData[dataArrIndex].status.includes(selectedStatus)){
        charData[dataArrIndex].status.push(selectedStatus)
        buttonEl.parentElement.children[2].innerHTML += `<div onclick="deleteStatus(this)" class="status-card">${selectedStatus}</div>`;
    }
    localStorage.setItem("data", JSON.stringify(charData));
}
  

const reset = () => {
    charName.value = "";
    charRoll.value = "";
    currentTask = {};
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

const update = () =>{
    sortCharList();
    updateCharContainer()
    updateCopyList();
    fillStatusList();
}


if (charData.length) {
    update();
}