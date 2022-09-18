import React from 'react';
import AsyncSelect from 'react-select/async';

class List extends React.Component {
  final = [];

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      selected: [],
      drinks: {},
      test: []
  };
}
  componentDidMount() {
    fetch('/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then(ingredientsList => {
      for(let ingredient of ingredientsList.drinks) {
        this.state.ingredients.push(
          {value: ingredient.strIngredient1, 
          label: ingredient.strIngredient1});
      }
    });
  }

  componentDidUpdate() {
    
  }

  handleChange = (selectedOption) => {
    this.setState({selected: selectedOption}, () => {
      console.log('selected options', this.state.selected);
    });

    selectedOption.forEach(option => {
      fetch(`/api/json/v1/1/filter.php?i=${option.value}`)
        .then((response) => response.json())
        .then(drinksList => {
          this.setState({drinks: {...drinksList, ingredient: option.value}}, () => {
            console.log('drinks: ',this.state.drinks);
          });
        });
    });
  };

  loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = this.state.ingredients.filter((option) => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );

      callback(filteredOptions);
    }, 500)
  }

  render() {
    return (
      <>
      <h2>List cocktails by ingredients:</h2>
        <AsyncSelect 
          loadOptions={this.loadOptions} 
          defaultOptions
          onChange={this.handleChange}
          isMulti
        />
       {Object.keys(this.state.drinks).map(drink => {
          <p key={drink.strDrink}>{this.state.drinks[drink].strDrink}</p>
				})}
      </>
    );
  }
}

export default List;