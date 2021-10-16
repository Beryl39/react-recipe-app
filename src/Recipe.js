import React from 'react';
import style from './recipe.module.css';
import './App.css';

//Props that were defined in the component inside the App.js file can be destructured and passed into the Recipe component here as arguments. That allows you to use those destructured values as dynamic values when building the HTML (or JSX)

const Recipe = ({ title, calories, image, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h2 className="caption">{title}</h2>
            <div className="image" ><img src={image} alt="" /></div>
            <p className="text"><strong>Calories:</strong> {Math.floor(calories)}</p>
            <p className="text"><strong>Ingredients:</strong></p>
            <ul className="ingredients">
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Recipe;