import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  //To have full access to an API's info, need the ID and Key
  const APP_ID = '71b053e7';
  const APP_KEY = 'ab0b70addcd9f76f02845bfe0b5ddc9f';

  //
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  //Use the follow state which will only submit itself AFTER we click the Search button to prevent overloading and exceeding the API limits - this gets inserted into the search field of the URL
  const [query, setQuery] = useState('chicken');

  //Make a request, by interpolating the ID and Key, to pull data from API
  // const exampleReq = https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${APP_ID}&app_key=${APP_KEY}&type=public;

  //Ensures that the API call can only be made once - this ensures that external users cannot exhaust API

  //First argument is the effect that gets run, second argument stipulates WHEN aforementioned effect should run

  //If second argument is an empty array, the effect only runs ONCE when the page loads, otherwise conditions can be inserted there for it to run when said condition are met
  useEffect(() => {
    getRecipes();
  }, [query]);

  //-------------------------------------------
  //Instead of placing all the functionality inside useEffect, we can use a separate function, i.e. asynchronously fetching all our recipe data
  const getRecipes = async () => {
    //Before an async function can perform fully, we first need to AWAIT the fetching of the data from the URL
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)

    //Once all the data has been fetched, create a JSON out of it
    //Ensure that you add 'await' every time you have a promise (fetching data from external source) because we don't know how long it will take to compile all the information
    const data = await response.json();
    setRecipes(data.hits);
    //When the getRecipes async function is set up, it needs to be invoked in the useEffect function before it can run
  }

  //When we go into the event object, the onChange event from the button gets run, and we can use the target of that event i.e. the input field, to change the value accordingly
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //prevents page from constantly reloading and overusing API
    setQuery(search); //complete value of our input
    setSearch(''); //resets search value to empty string after search was completed
  }

  //-------------------------------------------
  return (
    <div className="App">
      <form
        onSubmit={getSearch}
        className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search} //sets the value of the search box to the empty string it was set to in the state
          onChange={updateSearch} //allows us to run the function whenever the value gets changed
        />
        <button
          className="search-button"
          type="submit"
        >Search</button>
      </form>

      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;