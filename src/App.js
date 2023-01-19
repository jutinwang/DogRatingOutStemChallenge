import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import './App.css';

const randomDogLink = "https://dog.ceo/api/breeds/image/random"
const allBreeds = "https://dog.ceo/api/breeds/list/all"
let dogViewed = [["Image", "Rating"]];

function App() {
  var clicked = false;

  // https://www.pluralsight.com/guides/access-data-from-an-external-api-into-a-react-component
  // API to show random dog
  const [dogImage, setDogData] = useState({});
  
  useEffect(() => {
    fetchDogLink();
  }, []);

  const fetchDogLink = async() =>{
    let response = null;

    if (breedChosen == "0" || breedChosen == "Dog"){
      response = await fetch(randomDogLink);
    }else{
      response = await fetch(`https://dog.ceo/api/breed/${breedChosen}/images/random`);
    }

    var data = await response.json();
    var manipulateList = document.getElementById("breeds")

    setDogData(data);
    setRating(10);
    getBreeds(manipulateList.value)

    dogViewed.push([data.message, rating])

    console.log(dogViewed)
    createTable();
  }

  const [breedChosen, getBreeds] = useState(0);

  useEffect(() => {
    createDogList();
  }, []);

  const createDogList = async() => {
    let listResponse = await fetch(allBreeds);
    var data = await listResponse.json();
    var arrayOfNames = Object.keys(data.message)

    var manipulateList = document.getElementById("breeds");

    for (let i = 0; i < arrayOfNames.length; i++) {
      var opt = document.createElement("option");
      manipulateList.innerHTML += '<option>' + arrayOfNames[i] + '</option>';
    }
    
    getBreeds(manipulateList.value);
    // console.log(manipulateList.value);
  }
  


  // https://www.npmjs.com/package/react-simple-star-rating?activeTab=readme
  // Star Rating stuff
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate + 10)
    clicked = true

    // other logic
  }

  // Optinal callback functions
  const onPointerEnter = () => {
    console.log('Enter')
  }
  const onPointerLeave = () => {
    console.log('Leave')
    if (clicked == false){
      setRating(10)
    }
  }
  const onPointerMove = (value: number, index: number) => {
    console.log(value, index)
    setRating(value + 10)
  }

  function createTable() {
    //Create a the Table.
    var tableFrame = document.createElement("initialTable");
    tableFrame.border = "1";
    var row = tableFrame.insertRow(-1);

    //2 Columns so create variable for it (can be changed for dynamic lists)
    var columnCount = 2;

    //Create the header row.
    for (var x = 0; x < columnCount; x++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = dogViewed[0][x];
        row.appendChild(headerCell);
    }

    //Add the information.
    for (var x = 1; x < dogViewed.length; x++) {
        row = tableFrame.insertRow(-1);
        for (var y = 0; y < columnCount; y++) {
            var informationCell = row.insertCell(-1);
            informationCell.innerHTML = dogViewed[x][y];
        }
    }

    //append to table that already exists
    var finalTable = document.getElementById("Previous");
    finalTable.innerHTML = "";
    finalTable.appendChild(tableFrame);
}

  //Render onto React
  return (
    <div className="App">
      <h1>Rate My Dog!</h1>
      <div className='DogImageFrame'>
        <img className='DogImage' src={dogImage.message}></img>
      </div>

      <div className="BreedSelecter">
        <select id = "breeds">
          <option>Dog</option>
        </select>
      </div>

      <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove} 
      />

      <p>{rating} / 10</p>
      <div className='button'>
        <button onClick={fetchDogLink}>Click for New Dog</button>
      </div>

      <table id = "Previous">
      </table>


    </div>
  );
}

export default App;
