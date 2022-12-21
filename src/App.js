import './App.css';
import React from "react";
import { useState } from "react";
import Axios from 'axios';

const USER_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [names, setNames] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchItem, setSearchItem] = useState([]);

  function showNames() {
    Axios.get(USER_URL)
        .then(response => {
          let nameList = getNames(response);
          setNames(nameList);
        } )
  }

  function getNames(response) {
    let nameList = [];
    for(let i=0; i < response.data.length; i++){
      nameList.push(response.data[i].name);
    }
    return nameList;
  }

  function searchName() {
    let searchBox = document.getElementById('searchB');
    searchBox.removeAttribute("hidden");
  }

  function findName(e) {
    const searchValue = e.target.value; 
    setSearchItem(searchValue);
    let filteredList = names.filter(n =>  n?.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    filteredList = filteredList.map((item,key) => (<li key={key}>{item}</li>))

    setFilteredItems(filteredList);
  }

 
  return (
    <div className="App">
      <button onClick={showNames}>Click This Button for User Names</button>
      <button onClick={searchName}>Enable Filtering</button>
      <div id="input">
        <input onChange={findName} hidden type="text" id="searchB" placeholder="Enter a Name"></input>
      </div>
      <div>
        <ul className='list'>
          {
            (searchItem.length > 0) ? filteredItems : names.map((item, key) => (<li key={key}>{item}</li>))
          }
        </ul>
      </div>
      
    </div>
  );
}

export default App;
