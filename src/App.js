import { useState, useEffect } from 'react';
import './App.css';

const apilink = "https://dog.ceo/api/breeds/image/random"

function App() {
  const [dogImage, setDogData] = useState({});
  
  useEffect(() => {
    fetchDogLink();
  }, []);

  const fetchDogLink = async() =>{
    let response = await fetch(apilink);
    var data = await response.json();
    console.log(data.message);
    setDogData(data);
  }

  return (
    <div className="App">
      <h1>Title</h1>
      <img src={dogImage.message}></img>
    </div>
  );
}

export default App;
