import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Routes from '../routes';
import Ingredient from '../models/Ingredient';
import { Box, Button } from '@material-ui/core';
import IngredientCard from '../components/IngredientCard';
import Title from '../components/Title';

interface Props {
  baseIngredientsNumber: number,
  extraIngredientPrice: string,
  maxIngredients: number,
  ingredients: Ingredient[],
  setOrderIngredients: (ingredients: any) => void
}

export default function ChooseIngredients({
  baseIngredientsNumber,
  extraIngredientPrice,
  maxIngredients,
  ingredients,
  setOrderIngredients
}: Props) {
  const history = useHistory();
  const [totalIngredientsState, setTotalIngredientsState] = useState({count: 0});

  const useStyles = makeStyles(() => ({
    instructions: {
      marginBottom: '10px'
    },
    subtitle: {
      margin: '0',
      fontSize: '14px'
    },
    button: {
      marginTop: '20px',
      marginBottom: '30px'
    }
  }));
  const classes = useStyles();

  const checkIfCanAdd = () => {
    let totalQuantity = 0;
    ingredients.forEach(i => totalQuantity += i.quantity);
    setTotalIngredientsState({
      count: totalQuantity
    });
  }

  const decreaseIngredientQuantity = (ingredientIndex: number) => {
    ingredients[ingredientIndex].quantity--;
    checkIfCanAdd();
  }

  const increaseIngredientQuantity = (ingredientIndex: number) => {
    ingredients[ingredientIndex].quantity++;
    checkIfCanAdd();
  }

  function setIngredients() {
    const selectedIngredients = ingredients.filter(ing => ing.quantity > 0);
    setOrderIngredients(selectedIngredients);
    history.push(Routes.Confirmation);
  }

  return (
    <Box>
      <Title title="Choose the Ingredients" >
        <Box className={classes.instructions}>
          <p className={classes.subtitle}>
            You can choose up to {baseIngredientsNumber} ingredients without aditional cost
          </p>
          <p className={classes.subtitle}>
            After that, each new ingredient will cost ${extraIngredientPrice}
          </p>
          <p className={classes.subtitle}>Maximum: {maxIngredients}</p>
        </Box>
      </Title>
      {ingredients.map((ingredient, index) => {
        return <IngredientCard
          key={ingredient.id}
          name={ingredient.name}
          imgSrc={ingredient.imgSrc}
          quantity={ingredient.quantity || 0}
          canAdd={totalIngredientsState.count < maxIngredients}
          onRemove={() => decreaseIngredientQuantity(index)}
          onAdd={() => increaseIngredientQuantity(index)}
        />
      })}
      <Button
        onClick={setIngredients}
        variant="contained"
        color="primary"
        className={classes.button}
      >Finish</Button>
    </Box>
  )
};
