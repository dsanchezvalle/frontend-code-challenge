//Dependencies
import React, { useEffect, useState } from 'react';
//Modules
import './App.css';
//Constants
const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
    const [pokeList, setPokeList] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    
    //Effect to fetch Pokemon Data
    useEffect(()=>{
        let getPokemonList = async()=>{
            try{
                let fetchedData = await fetch("https://raw.githubusercontent.com/joseluisq/pokemons/master/pokemons.json");
                let response = await fetchedData.json();
                let itemList = response.results;
                console.log(itemList);
                setPokeList(itemList); 
             }
             catch(err){
                 console.log(err);
             }
        }
        getPokemonList(); 
    },[]);

    //Effect to apply the filters
    useEffect(()=>{
        filterPokemonList();
    },[userInput])

    //Filter PokemonList by Name or Type
    function filterPokemonList() {
        console.log(pokeList);
        let filteredList = [];
        //let filteredList2 = [];
        console.log(userInput);
        if(userInput.length === 0){
            filteredList = pokeList;   
        }
        else{
            filteredList = pokeList.filter(pokemon => pokemon.name === userInput);
        }
        console.log(filteredList);

    }

 return (
 <>
    <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>
            Maximum Combat Points
        </small>
    </label>
    <input 
        type="text" 
        className="input" 
        placeholder="Pokemon or type"
        value={userInput}
        onChange={(e)=>setUserInput(e.target.value)} 
    />
    <div className="loader"></div>
    <ul className="suggestions">
        {filteredResults.length === 0 ? (
            <li>
            <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
            <div className="info">
                <h1 className="no-results">
                    No results
                </h1>
            </div>
        </li>
        ):(
            <li>
            <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" alt="" />
            <div className="info">
                <h1>
                    <span className="hl">Pika</span>chu</h1>
                <span className="type electric">Electric</span>
                <span className="type normal">Normal</span>
            </div>
        </li>
        )}       
        
    </ul>
   </>
)   
}



export default App;
