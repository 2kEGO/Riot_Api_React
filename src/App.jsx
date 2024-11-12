import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [champions, setChampions] = useState([]);
  const [championInfo, setChampionInfo] = useState([]);
 
  useEffect(() => {
    // Fetch the list of champions
    fetch('https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json')
      .then(response => response.json())
      .then(data => {
        const champions = Object.keys(data.data);  // List of champion keys

        // Fetch additional data for each champion
        champions.forEach(championId => {
          fetch(`https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion/${championId}.json`)
            .then(response => response.json())
            .then(championData => {
              setChampions(prevChampions => [
                ...prevChampions,
                championData.data[championId]
              ]);
              console.log(championData.data);
            })
            
            .catch(error => console.error(`Error fetching data for ${championId}:`, error));
        });
      })
      .catch(error => console.error('Error fetching champions list:', error));
  }, []);



  return (
    <div className='card-container'>
      
      {champions.map((champion) => (

        <div key={champion.key} className='card'>

          <div className="card-header">
            <h1>{champion.id}</h1>
            <h2>{champion.title}</h2>
          </div>

          <div className='card-tags'>
            {champion.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>

          <div className="card-img">
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${champion.id}.png`} alt={champion.id} />
          </div>

          <div className="passive">
            <p>{champion.lore}</p>
          </div>

          <div className="stats">
            <h2></h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
