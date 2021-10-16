import React from 'react';

//Props that were defined in the component inside the App.js file can be destructured and passed into the Recipe component here as arguments. That allows you to use those destructured values as dynamic values when building the HTML (or JSX)

const Recipe = ({ title, calories, image }) => {
    return (
        <div>
            <h2>{ title }</h2>
            <p>{ calories }</p>
            <img src={ image } alt="" />
        </div>
    );
}

export default Recipe;