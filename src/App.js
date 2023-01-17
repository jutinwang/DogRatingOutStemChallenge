import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import './App.css';

const apilink = "https://dog.ceo/api/breeds/image/random"

function App() {

  // https://www.pluralsight.com/guides/access-data-from-an-external-api-into-a-react-component
  // API to show random dog
  const [dogImage, setDogData] = useState({});
  
  useEffect(() => {
    fetchDogLink();
  }, []);

  const fetchDogLink = async() =>{
    let response = await fetch(apilink);
    var data = await response.json();
    console.log(data.message);
    setDogData(data);
    setRating(10)
  }

  // https://www.npmjs.com/package/react-simple-star-rating?activeTab=readme
  // Star Rating stuff
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate + 10)

    // other logic
  }

  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)

  //Render onto React
  return (
    <div className="App">
      <h1>Title</h1>
      <div className='DogImageFrame'>
        <img className='DogImage' src={dogImage.message}></img>
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
    </div>
  );
}

export default App;
