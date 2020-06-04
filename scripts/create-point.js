function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => response.json())
    .then(states => {
        for ( let state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    });
}

populateUF();

function getCities(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const UF = event.target.value;

    const indexState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`;
    citySelect.innerHTML = "<option value>Slecione a cidade</option>";
    citySelect.disabled = true;


    fetch(url)
    .then(response => response.json())
    .then(cites => {
        for ( let city of cites ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItem = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;


    const alreadySelected = selectedItem.findIndex( item => item == itemId);

    if (alreadySelected >= 0) {
        const filteredItems = selectedItem.filter( item => item != itemId);
        
        selectedItem = filteredItems;
    } else {
        selectedItem.push(itemId);
    }

    collectedItems.value = selectedItem;
}

