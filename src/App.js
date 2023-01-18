import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import './App.css';

const randomDogLink = "https://dog.ceo/api/breeds/image/random"
const allBreeds = "https://dog.ceo/api/breeds/list/all"

function App() {
  var clicked = false;
  // let dogViewed = [];

  // https://www.pluralsight.com/guides/access-data-from-an-external-api-into-a-react-component
  // API to show random dog
  const [dogImage, setDogData] = useState({});
  
  useEffect(() => {
    fetchDogLink();
  }, []);

  const fetchDogLink = async() =>{
    let response = null;
    if (breedChosen != "Select a Dog Breed"){
      response = await fetch(`https://dog.ceo/api/breed/${breedChosen}/images/random`);
    }else{
      response = await fetch(randomDogLink)
    }
    var data = await response.json();

    var manipulateList = document.getElementById("breeds")
    console.log(data.message);
    setDogData(data);
    setRating(10);
    getBreeds(manipulateList.value)
    console.log(manipulateList.value);
    // dogViewed.push({image: data.message, rating: rating})
    // console.log(dogViewed)
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

  //Render onto React
  return (
    <div className="App">
      <h1>Rate My Dog!</h1>
      <div className='DogImageFrame'>
        <img className='DogImage' src={dogImage.message}></img>
      </div>

      <div className="BreedSelecter">
        <select id = "breeds">
          <option>Select a Dog Breed</option>
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

      {/* <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Rating</th>
        </tr>
        </thead>
      </table> */}


    </div>
  );
}

export default App;
