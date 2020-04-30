import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Routes from '../routes';
import Title from '../components/Title';

export default function Home() {
  const history = useHistory();
  const useStyles = makeStyles(() => ({
    container: {
      backgroundColor: '#F6BB0A',
      margin: '-24px',
      height: '60vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    pizzaImage: {
      height: '30vh'
    },
    bottomPanel: {
      backgroundColor: "#F7F8F9",
      boxShadow: '2px 2px 6px #CCCCCC',
      width: '470px',
      height: '40vh',
      position: 'absolute',
      bottom: '0',
      borderRadius: '50px 50px 0 0',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }));
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <img className={classes.pizzaImage} src="pizza.svg" alt="pizza" />
      <Box className={classes.bottomPanel}>
        <Button
          onClick={() => history.push(Routes.Size)}
          variant="contained"
          color="primary"
        >
          <Title title="Create your Pizza"/>
        </Button>
      </Box>
    </Box>
  )
};
