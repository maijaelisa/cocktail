import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Random resepti
  const fetchRandomCocktail = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    setRandomCocktail(data.drinks[0]);
  };

  // Reseptin haku
  const searchCocktails = async () => {
    // Tyhjennetään randomCocktail kun haetaan resepti
    setRandomCocktail(null);

    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const data = await response.json();
    setSearchResults(data.drinks || []);
  };


  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return (
    
    <div className="App">
      <header className="App-header">
        <h2>Cocktail Recipe Finder</h2>
        <h3>Search for a Cocktail Recipe:</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchCocktails}>Search</button>
       
        {searchResults.map((cocktail, index) => (
          //Aineksien hakuun tehdään lista
          <div key={index}>
            <h3>{cocktail.strDrink}</h3>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>Category: {cocktail.strCategory}</p>
            <p>Glass: {cocktail.strGlass}</p>
            <p>Instructions: {cocktail.strInstructions}</p>
            <p>Ingredients:</p>
            <ul>
              {Array.from({ length: 15 }).map((_, i) => {
                const ingredient = cocktail[`strIngredient${i + 1}`];
                const measure = cocktail[`strMeasure${i + 1}`];
                if (ingredient) {
                  return (
                    <li key={i}>
                      {measure} {ingredient}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        ))}

        {randomCocktail && (
          //Aineksien hakuun tehdään lista
          <div>
            <h2>Random Cocktail Recipe:</h2>
            <h3>{randomCocktail.strDrink}</h3>
            <img src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} />
            <p>Category: {randomCocktail.strCategory}</p>
            <p>Glass: {randomCocktail.strGlass}</p>
            <p>Instructions: {randomCocktail.strInstructions}</p>
            <p>Ingredients:</p> 
            <ul>
              {Array.from({ length: 15 }).map((_, i) => {
                const ingredient = randomCocktail[`strIngredient${i + 1}`];
                const measure = randomCocktail[`strMeasure${i + 1}`];
                if (ingredient) {
                  return (
                    <li key={i}>
                      {measure} {ingredient}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}


      </header>
    </div>
  );
};

export default App;
