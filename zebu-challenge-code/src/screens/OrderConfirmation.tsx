import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Routes from '../routes';
import Order from '../models/Order';
import { Box, Paper, Button, Typography } from '@material-ui/core';
import Title from '../components/Title';

interface Props {
  order: Order,
  sendOrder: (order: Order) => void
}

export default function OrderConfirmation({order, sendOrder}: Props) {
  const history = useHistory();
  const useStyles = makeStyles(() => ({
    container: {
      padding: '30px',
      paddingBottom: '10px'
    },
    image: {
      width: '50%',
      marginBottom: '15px'
    },
    info: {
      textAlign: 'left'
    },
    ingredientImage: {
      width: '35px',
      height: '35px',
      margin: '0 8px'
    },
    ingredientText: {
      margin: '0'
    },
    total: {
      padding: '20px',
      fontWeight: 600,
      backgroundColor: '#F6BB0A',
      borderRadius: '40px 40px 0 0',
    },
    button: {
      marginTop: '20px',
      marginBottom: '30px'
    }
  }));
  const classes = useStyles();

  function finishOrder() {
    sendOrder(order);
    history.push(Routes.Home);
  }

  return (
    <Box>
      <Title title="Order Confirmation" />
      <Paper>
        <Box className={classes.container}>
          <img src="pizza.svg" alt="pizza" className={classes.image} />
          <p className={classes.info}><strong>Size: </strong>{order.size.name}</p>
          <p className={classes.info}><strong>Crust type: </strong>{order.crust.name}</p>
          <p className={classes.info}><strong>Ingredients: </strong></p>
          {order.ingredients.map(ingredient => {
            return <Box key={ingredient.id} display="flex" alignItems="center" margin="10px 15px">
              <img src={ingredient.imgSrc} className={classes.ingredientImage} alt={ingredient.name}/>
              <p className={classes.ingredientText}>{ingredient.quantity}x - {ingredient.name}</p>
            </Box>
          })}
        </Box>
        <Typography variant="h5" className={classes.total}>Total Price ${order.total}</Typography>
      </Paper>
      <Button
        onClick={finishOrder}
        variant="contained"
        color="primary"
        className={classes.button}
      >Send Order</Button>
    </Box>
  )
};
