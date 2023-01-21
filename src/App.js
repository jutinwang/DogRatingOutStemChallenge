import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import './App.css';

const randomDogLink = "https://dog.ceo/api/breeds/image/random";
const allBreeds = "https://dog.ceo/api/breeds/list/all";
let dogViewed = [["Image", "Rating"]];
let dogViewedCopy = [["Image", "Rating"]];

function App() {
  var clicked = false; //variable to set star value

  // API to show random dog
  const [dogImage, setDogData] = useState({});
  
  //Calls function when page is loaded
  useEffect(() => {
    initialShowing();
  }, []);

  //Displays first image
  async function initialShowing(){
    let responseInitital = null;
    responseInitital = await fetch(randomDogLink); //fetch api data
    var data = await responseInitital.json();
    setDogData(data); //set dogImage variable to data
  }

  //Fetch image based on API link
  const fetchDogLink = async() =>{
    let response = null;

    var manipulateList = document.getElementById("breeds");
    getBreeds(manipulateList.value); //set new breedValue

    //if statement to choose between filtered dogs or total random dogs
    if (breedChosen == "0" || breedChosen == "Dog"){
      response = await fetch(randomDogLink);
    }else{
      response = await fetch(`https://dog.ceo/api/breed/${breedChosen}/images/random`);
    }

    var data = await response.json();

    dogViewed.push([dogImage.message, rating])//puts current dog and rating into array

    setDogData(data); //set dogImage to new dog image
    setRating(10); //reset rating to 10

    console.log(dogViewed)
  }

  const [breedChosen, getBreeds] = useState(0);

  useEffect(() => {
    createDogList(); //Creates a drop down menu when the page is loaded
  }, []);

  //Function to create the dog 
  const createDogList = async() => {
    let listResponse = await fetch(allBreeds);
    var data = await listResponse.json(); //extracts an object of all the names of the breeds the API has
    var arrayOfNames = Object.keys(data.message) //puts the keys of the object in a list

    var manipulateList = document.getElementById("breeds");

    //Loop to put all keys into the dropdown menu
    for (let i = 0; i < arrayOfNames.length; i++) {
      var opt = document.createElement("option");
      manipulateList.innerHTML += '<option>' + arrayOfNames[i] + '</option>';
    }
    
  }

  // Star Rating stuff
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate + 10)
    clicked = true
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

  //function to create table of previous rating and pictures
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

    //send all the data of table to created html table
    var dvTable = document.getElementById("Previous");
    dvTable.innerHTML = "";
    dvTable.appendChild(tableIntital);
  }

  //function to sort list from smallest rating on top to largest at the bottom
  function sortSmallFirst(){
    dogViewed = dogViewed.sort((a, b) => a[1] - b[1]);
    createTable();
  }

  //function to sort list from largest rating on top to largest at the bottom
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
        <button className = "viewList" onClick={createTable}>View List</button>
        <button className = "viewList" onClick={sortSmallFirst}>Sort: Smallest to Largest</button>
        <button className = "viewList" onClick={sortLargeFirst}>Sort: Largest to Smallest</button>
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
