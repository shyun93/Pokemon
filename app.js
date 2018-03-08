var submitButton = document.getElementsByClassName("submit")[0];
var pokemonResults = document.getElementsByClassName("pokemon-results")[0];
var pokemonName = document.getElementsByClassName("pokemon")[0];
var pokemonStats = document.getElementsByClassName("pokemon-stats")[0];
var loading = document.getElementsByClassName("loading-animation")[0];

function apiurl(pokemon){
    return `http://pokeapi.salestock.net/api/v2/pokemon/${pokemon}`;
}

function submitPokemon(){
    var inputPokemon = document.getElementsByClassName("tt-input")[0];
    var submittedPokemon = inputPokemon.value.toLowerCase();
    getPokemon(submittedPokemon)
    $(loading).show();
}

function getPokemon(pokemonName){
    $.get(apiurl(pokemonName), function(description){
        $(loading).hide();
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
document.getElementsByClassName("typeahead")[0].onkeydown = function(enter){
    if(enter.keyCode === 13){
        console.log("enter")
        submitPokemon()
    }
}

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };

var pokemonList = ["Bulbasaur", "Ivysaur", "Venusaur", "Mega Venusaur","Charmander", "Charmeleon", "Charizard", "Mega Charizard X", "Mega Charizard Y", "Squirtle",
"Wartortle", "Blastoise", "Mega Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Mega Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Mega Pidgeot", 
"Rattata","Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran","Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", 
"Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", 
"Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Mega Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", 
"Mega Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Mega Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", 
"Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Mega Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", 
"Jynx", "Electabuzz", "Magmar", "Pinsir", "Mega Pinsir", "Tauros", "Magikarp", "Gyarados", "Mega Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Mega Aerodactyl", "Snorlax", 
"Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mega Mewtwo X", "Mega Mewtwo Y", "Mew", "MissingNo.", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", 
"Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Mega Ampharos", "Bellossom", "Marill", "Azumarill", 
"Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Mega Steelix", 
"Snubbull", "Granbull", "Qwilfish", "Scizor", "Mega Scizor", "Shuckle", "Heracross", "Mega Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Mega Houndoom", 
"Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Mega Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Treecko", 
"Grovyle", "Sceptile", "Mega Sceptile", "Torchic", "Combusken", "Blaziken", "Mega Blaziken", "Mudkip", "Marshtomp", "Swampert", "Mega Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", 
"Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Mega Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mega Sableye", "Mawile", "Mega Mawile", "Aron", "Lairon", "Aggron", "Mega Aggron", 
"Meditite", "Medicham", "Mega Medicham", "Electrike", "Manectric", "Mega Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Mega Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Mega Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", 
"Altaria", "Mega Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Mega Banette", "Duskull", "Dusclops", 
"Tropius", "Chimecho", "Absol", "Mega Absol", "Wynaut", "Snorunt", "Glalie", "Mega Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Mega Salamence", "Beldum", "Metang", "Metagross", "Mega Metagross", "Regirock", "Regice", "Registeel", "Latias", "Mega Latias", "Latios", 
"Mega Latios", "Kyogre", "Primal Kyogre", "Groudon", "Primal Groudon", "Rayquaza", "Mega Rayquaza", "Jirachi", "Deoxys", "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", 
"Shinx", "Luxio", "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mega Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", 
"Mega Garchomp", "Munchlax", "Riolu", "Lucario", "Mega Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke", "Snover", "Abomasnow", "Mega Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Mega Gallade", "Probopass", "Dusknoir", 
"Froslass", "Rotom", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", 
"Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill", "Audino", 
"Mega Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", 
"Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss", "Frillish", "Jellicent", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", 
"Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", 
"Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect", "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar", "Flabébé", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", 
"Meowstic", "Honedge", "Doublade", "Aegislash", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg", "Noibat", "Noivern", "Xerneas", 
"Yveltal", "Zygarde", "Diancie", "Mega Diancie", "Hoopa", "Volcanion"]

$('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'name',
    source: substringMatcher(pokemonList)
  })
