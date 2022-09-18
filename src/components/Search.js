import { React, Component, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import SearchList from './SearchList';

function Search () {
  const [ query, setQuery ] = useState("");
  const [ select, setSelect ] = useState("");
  const [ data, setData ] = useState([]);
  const keys = ["strDrink"];

  useEffect(() => {
    const fetchDrinks = async () => {
        let res = await axios.get(`/api/json/v1/1/search.php?s=${query}`);
        console.log(res.data.drinks);
        if(select) {
          let non = [];
            for(let i = 0; i < res.data.drinks.length; i++) {
              if (res.data.drinks[i].strAlcoholic === "Non alcoholic") {
                  non.push(res.data.drinks[i]);
              }
          }

          setData(non);
        } else {
          setData(res.data.drinks);
        }
    }

    setData([]);

    if(query.length > 1) fetchDrinks();

  },[query, select]);

  const search = (data) => {
    return data.filter(
      (item) => 
        keys.some(key => item[key].toLowerCase().includes(query))
      );
  };
  
  return (
    <>
      <h2>thecocktaildb.com </h2>
      <InputGroup>
        <InputGroup.Checkbox
          aria-label="Checkbox button for following text input"
          onChange={(e) => setSelect(e.target.checked ? "Non_Alcoholic" : "")} />
        <Form.Control
          className="search" 
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Text input with radio button" />
      </InputGroup>
      <p>Non-Alcoholic</p>

      {<SearchList data={data}></SearchList>}
    </>
  );
}

export default Search;