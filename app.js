var submitButton = document.getElementsByClassName("submit")[0];
var pokemonResults = document.getElementsByClassName("pokemon-results")[0];
var pokemonName = document.getElementsByClassName("pokemon")[0];
var pokemonStats = document.getElementsByClassName("pokemon-stats")[0];

function apiurl(pokemon){
    return `http://pokeapi.salestock.net/api/v2/pokemon/${pokemon}`;
}

function submitPokemon(){
    var inputPokemon = document.getElementsByClassName("search")[0];
    var submittedPokemon = inputPokemon.value.toLowerCase();
    getPokemon(submittedPokemon)
}

function getPokemon(pokemonName){
    $.get(apiurl(pokemonName), function(description){
        console.log(description)
        deleteResults()
        displayDetails(description)
        displayStats(description.stats)
        displayPokemon(description.name)
    })
}

function displayPokemon(pokemonDetail){
    pokemonName.innerHTML += pokemonDetail
}

function displayDetails(pokemonDescription){
    var pokemonAbilities = pokemonDescription.abilities;
    var pokemonType = pokemonDescription.types[0].type.name;
    var pokemonHeight = pokemonDescription.height;
    var pokemonWeight = pokemonDescription.weight;
    var pokemonImage = pokemonDescription.sprites["front_default"];

    var height =`
        <div class= "height-info">
            <h3>Height: ${pokemonHeight} inches</h3>
        </div>
    `
    pokemonResults.innerHTML += height

    var weight =`
        <div class = "weight-info">
            <h3>Weight: ${pokemonWeight} Kilograms</h3>
        </div>
        `
    pokemonResults.innerHTML += weight

    var typeHeader = `
        <div class="type-header">
            <h3>Type: ${pokemonType}</h3>
        </div>
    `
    pokemonResults.innerHTML += typeHeader
    
    var abilityHeader = `
        <div class= "ability-header">
            <h3>Abilties:</h3>
        </div>
    `
    pokemonResults.innerHTML += abilityHeader
    
    for(var i = 0; i < pokemonAbilities.length; i++){
        var ability = pokemonAbilities[i]["ability"]["name"]
        var markUpAbility = `
            <div class="ability">
                <ul>
                    <li>${ability}</li>
                </ul>
            </div>
        `
        pokemonResults.innerHTML += markUpAbility;
    }

    var imageDisplay = `
        <div>
            <img class="pokemon-image" src="${pokemonImage}">
        </div>
    `
    pokemonResults.innerHTML += imageDisplay

}

function displayStats(pokemonStat){
    var statHeading = `
    <table class="stats">
        <tr>
            <th class="stat-header">Stat</th>
            <th class="data-header">Score</th>
        </tr>
    </table>
    `
pokemonStats.innerHTML += statHeading
    for (var i = 0; i < pokemonStat.length; i++){
        var statName = pokemonStat[i]["stat"]["name"];
        var stat = pokemonStat[i]["base_stat"]

        var markUpStats = `
            <table class="stats">
                <tr>
                    <td class="stat-name">${statName}</td>
                    <td class="stat-data">${stat}</td>
                </td>
            </table>
            
        `
        pokemonStats.innerHTML += markUpStats
    }
}


function deleteResults(){
    pokemonResults.innerHTML = ""
    pokemonName.innerHTML = ""
    pokemonStats.innerHTML = ""
}


submitButton.addEventListener("click", submitPokemon)
document.getElementsByClassName("search")[0].onkeydown = function(enter){
    if(enter.keyCode === 13){
        console.log("enter")
        submitPokemon()
    }
}





