import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import Size from './models/Size';
import Crust from './models/Crust';
import Order from './models/Order';
import Home from './screens/Home';
import ChooseSize from './screens/ChooseSize';
import ChooseCrust from './screens/ChooseCrust';
import ChooseIngredients from './screens/ChooseIngredients';
import OrderConfirmation from './screens/OrderConfirmation';
import AppFrame from './components/AppFrame';
import Ingredient from './models/Ingredient';
import Snackbar from './components/Snackbar';
import { getInfo, updateInfo } from './api/appData';
import { Box } from '@material-ui/core';

function App() {
  useEffect(() => {
    getInfo().then(data => {
      setSizesState({sizes: data.sizes});
      setCrustsState({crusts: data.crusts});
      setIngredientsSettingsState({
        baseIngredientsNumber: data.baseIngredientsNumber,
        extraIngredientPrice: data.extraIngredientPrice
      });
      setIngredientsState({ingredients: data.ingredients});
      setPreviousOrdersState({orders: data.orders});
      setOrderState({order: {...orderState.order, id: data.orders.length.toString()}});
    }, error => {
      handleAlertOpen('Failed to load information.');
    })
  }, []);

  const [alertState, setAlertState] = useState({open: false, message: ''});
  const [sizesState, setSizesState] = useState({sizes: []});
  const [crustsState, setCrustsState] = useState({crusts: []});
  const [ingredientsSettingsState, setIngredientsSettingsState] = useState({
    baseIngredientsNumber: 0,
    extraIngredientPrice: 0
  });
  const [ingredientsState, setIngredientsState] = useState({ingredients: []});
  const [previousOrdersState, setPreviousOrdersState] = useState({orders: []});
  const [orderState, setOrderState] = useState({
    order: new Order({
      id: '',
      size: {id: '', name: '', price: 0, maxToppings: 0},
      crust: {id: '', name: '', price: 0, imageSrc: ''},
      ingredients: [],
      total: 0
    })
  });

  function setOrderSize(size: Size) {
    const order = orderState.order;
    setOrderState({order: {...order, size, total: order.total + size.price}});
  }

  function setOrderCrust(crust: Crust) {
    const order = orderState.order;
    setOrderState({order: {...order, crust, total: order.total + crust.price}});
  }

  function setOrderIngredients(ingredients: Ingredient[]) {
    let order = orderState.order;
    let finalQuantity = 0;
    let aditionalCost = 0;
    ingredients.forEach(i => finalQuantity += i.quantity);
    if(finalQuantity > ingredientsSettingsState.baseIngredientsNumber) {
      aditionalCost = (finalQuantity - ingredientsSettingsState.baseIngredientsNumber) * ingredientsSettingsState.extraIngredientPrice;
    }
    setOrderState({order: {...order, ingredients, total: order.total + aditionalCost}});
  }

  function cleanIngredientsQuantity() {
    let ingredients = ingredientsState.ingredients;
    ingredients.forEach((ingredient: Ingredient) => ingredient.quantity = 0);
    setIngredientsState({ingredients});
  }

  function cleanOrder() {
    setOrderState({order: {
      id: '',
      size: {id: '', name: '', price: 0, maxToppings: 0},
      crust: {id: '', name: '', price: 0, imageSrc: ''},
      ingredients: [],
      total: 0
    }});
  }

  function sendOrder(order: Order) {
    updateInfo([...previousOrdersState.orders, order]).then(response => {
      handleAlertOpen('Order successfully sent!');
    }, error => {
      handleAlertOpen('Failed to send order.');
    });
    cleanIngredientsQuantity();
    cleanOrder();
  }

  function handleAlertOpen(message: string) {
    setAlertState({open: true, message});
  };

  function handleAlertClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') return;
    setAlertState({...alertState, open: false});
  };

  return (
    <Box>
      <AppFrame>
        <BrowserRouter>
          <Switch>
            <Route path={Routes.Home} exact={true}>
              <Home />
            </Route>
            <Route path={Routes.Size}>
              <ChooseSize
                sizes={sizesState.sizes}
                setOrderSize={(size) => setOrderSize(size)}
              />
            </Route>
            <Route path={Routes.Crust}>
              <ChooseCrust
                crusts={crustsState.crusts}
                setOrderCrust={(crust) => setOrderCrust(crust)}
              />
            </Route>
            <Route path={Routes.Ingredients}>
              <ChooseIngredients
                baseIngredientsNumber={ingredientsSettingsState.baseIngredientsNumber}
                extraIngredientPrice={ingredientsSettingsState.extraIngredientPrice.toString()}
                maxIngredients={orderState.order.size.maxToppings}
                ingredients={ingredientsState.ingredients}
                setOrderIngredients={(ingredients) => setOrderIngredients(ingredients)}
              />
            </Route>
            <Route path={Routes.Confirmation}>
              <OrderConfirmation
                order={orderState.order}
                sendOrder={(order) => sendOrder(order)}
              />
            </Route>
            <Redirect to={Routes.Home}/>
          </Switch>
        </BrowserRouter>
        <Snackbar open={alertState.open} message={alertState.message} handleClose={handleAlertClose}/>
      </AppFrame>
    </Box>
  );
}

export default App;
