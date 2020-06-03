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

    fetch(url)
    .then(response => response.json())
    .then(cites => {
        for ( let city of cites ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);