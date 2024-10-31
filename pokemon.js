document.getElementById("btnsumbit").addEventListener("click", async(e) => {
 e.preventDefault();

 const count = document.getElementById("pokemon-count").value;
 const category = document.getElementById("pokemon-category").value;
 const cardContainer = document.getElementById("pokemon_container");

 //phele ka kuch rhega loaded pokemon isliye clear kiya
 cardContainer.innerHTML = "";

 let pokemonCards = [];

 try{   
    for(let i=1;i<=count;i++){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await response.json();

        const hasType = data.types.some(type => type.type.name === category);
        console.log(data.forms);
        if(hasType){    
            pokemonCards.push(createPokemon(data));
        }

        if(pokemonCards.length >= count){
            break;
        }
    }

    if(pokemonCards.length === 0){
        cardContainer.innerHTML = '<p>No Pokemon found for this category<p/>'
    }else{  
        pokemonCards.forEach(card => cardContainer.appendChild(card));
    }
 }catch(error){
    console.log("Error encountered during fetching the data", error);
    cardContainer.innerHTML = '<p>Error encountered during the fetching the data<p/>';
 }
});

//pokemon ka card bna rhe h
function createPokemon(Pokemon){
    const card = document.createElement("div");
    card.setAttribute("class", "pokemon-card");

    /* const types = Pokemon.types.map(m => m.type.name);
    if(types.includes("water")){
        card.style.backgroundColor = "blue";
    }else if(types.includes("fire")){
        card.style.backgroundColor = "orange";
    }else if(types.includes("grass")){
        card.style.backgroundColor = "green";
    }else if (types.includes("electric")) {
        card.style.backgroundColor = "yellow"; // Electric type
    } else {
        card.style.backgroundColor = "blanchedalmond"; // Default color for other types
    } */

    const text = document.createElement("h3");
    text.textContent = Pokemon.name.charAt(0).toUpperCase() + Pokemon.name.slice(1);
    
    const image = document.createElement("img");
    image.setAttribute("src", Pokemon.sprites.front_default);
    image.setAttribute("alt",Pokemon.name);

    const type = document.createElement("p");
    type.textContent = `Type : ${Pokemon.types.map( m => m.type.name).join(', ')}`


    card.appendChild(text);
    card.appendChild(image);
    card.appendChild(type);

    return card;    
}