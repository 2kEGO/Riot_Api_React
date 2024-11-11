import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [champions, setChampions] = useState([]);
  const [championInfo, setChampionInfo] = useState([]);

  useEffect(() => {
    getApi();
    
  }, []);

  async function getApi() {
    try {
      const res = await fetch('https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json');

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const championData = Object.values(data.data)
      // console.log(championData);
      setChampions(championData);
      
      championData.forEach(champion => getChampionsSkinApi(champion.id))
      

    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }

  async function getChampionsSkinApi(){
    try {
      const info = await fetch('https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion/${championId}.json');

      if (!info.ok) {
        throw new Error(`HTTP error! status: ${info.status}`);
      }

      const infoData = await info.json();
      setChampionInfo(Object.values(infoData.data));
      // console.log(infoData.data);
      

    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }


  return (
    <div className='card-container'>
      {champions.map((champion) => (
        <div key={champion.id} className="card">
          <div className="header">
            <h1>{champion.name}</h1>
            <h2>{champion.title}</h2>
          </div>

          <div className="difficulties">
            <h3>{champion.difficulty}</h3>
          </div>

          <div className="body">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${champion.image.full}`}
              alt={champion.name}
            />
          </div>
          <div className="desc">
            <p>{champion.blurb}</p>
          </div>
          <hr />
          <div className='info'>
            <h2>ATK/{champion.info.attack}</h2>
            <h2>DEF/{champion.info.defense}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
