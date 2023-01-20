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
    initialShowing();
  }, []);

  async function initialShowing(){
    let response = null;
    response = await fetch(randomDogLink);
    var data = await response.json();
    setDogData(data);
  }

  const fetchDogLink = async() =>{
    let response = null;

    if (breedChosen == "0" || breedChosen == "Dog"){
      response = await fetch(randomDogLink);
    }else{
      response = await fetch(`https://dog.ceo/api/breed/${breedChosen}/images/random`);
    }

    var data = await response.json();
    var manipulateList = document.getElementById("breeds")

    dogViewed.push([dogImage.message, rating])

    setDogData(data);
    setRating(10);
    getBreeds(manipulateList.value)

    console.log(dogViewed)
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
    //Create a HTML Table element.
    var tableIntital = document.createElement("TABLE");
    tableIntital.border = "1";
    var row = tableIntital.insertRow(-1);

    //Get the count of columns.
    var columnCount = 2;

    //Add the header row.
    for (var x = 0; x < columnCount; x++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = dogViewed[0][x];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var x = 1; x < dogViewed.length; x++) {
        row = tableIntital.insertRow(-1);
        for (var y = 0; y < columnCount; y++) {
            var cell = row.insertCell(-1);
            if (dogViewed[x][y].length > 2){
              cell.innerHTML = `<img src = ${dogViewed[x][y]}></img>`
            }else{
              cell.innerHTML = dogViewed[x][y];
            }
        }
    }

    var dvTable = document.getElementById("Previous");
    dvTable.innerHTML = "";
    dvTable.appendChild(tableIntital);
  }

  function sortSmallFirst(){
    dogViewed = dogViewed.sort((a, b) => a[1] - b[1]);
    createTable();
  }

  function sortLargeFirst(){
    dogViewed = dogViewed.sort((a, b) => b[1] - a[1]);
    createTable();
  }

  //Render onto React
  return (
    <div className="App">
      <div className="Title">
        <h1>Rate My Dog!</h1>
      </div>
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

      <p className = "Rating">Current Dog Rating: {rating} / 10</p>
      <div className='button'>
        <button className = "newDog" onClick={fetchDogLink}>Click for New Dog</button>
      </div>
      <div className = 'createList'>
        <button class = "viewList" onClick={createTable}>View List</button>
        <button class = "viewList" onClick={sortSmallFirst}>Sort: Smallest to Largest</button>
        <button class = "viewList" onClick={sortLargeFirst}>Sort: Largest to Smallest</button>
      </div>

      <table id = "Previous">
         <thead>
         <tr>
         </tr>
         </thead>
       </table>


    </div>
  );
}

export default App;
