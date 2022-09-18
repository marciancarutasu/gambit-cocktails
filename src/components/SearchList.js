import React from "react";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import SearchDescription from './SearchDescription';

const SearchList = ({data}) => {
    if(data) {
        if(data.length === 1) {
            var tabActive = "#";
            tabActive += data[0].idDrink;
        }

        function getRecipe(item) {
            let recipe = {};

            Object.entries(item).forEach(([key, value]) => {
                for(let i = 0; i < 15; i++) {
                    if(key.includes(`strIngredient${i}`) && value != null) {
                        recipe[i] = value;
                    }

                    if(key.includes(`strMeasure${i}`) && value != null) {
                        recipe[i] += ` (${value})`;
                    }
                }
              });

            return Object.values(recipe).join(' ');
        }

        return (
            <Tab.Container activeKey={tabActive} id="list-group-tabs-example" >
                <Row>
                <Col sm={4}>
                    <ListGroup>
                        {data.map(item => (
                            <ListGroup.Item action onClick={(e) => e.preventDefault()} href={item.idDrink} key={item.idDrink}>
                            {item.strDrink}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        {data.map((item, index, arr) => (
                             <Tab.Pane eventKey={item.idDrink} key={item.idDrink}>
                             <SearchDescription 
                                instructions={item.strInstructions}
                                thumb={item.strDrinkThumb}
                                recipe={getRecipe(item)}
                            />
                         </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
                </Row>
            </Tab.Container>
            );
    } else {
        return (
            <div>No drinks found.Sorry</div>
        )
    }
    
}

export default SearchList;