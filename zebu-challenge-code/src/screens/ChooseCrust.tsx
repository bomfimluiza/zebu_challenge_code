import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Routes from '../routes';
import Crust from '../models/Crust';
import { Box, Grid, Button } from '@material-ui/core';
import CardRadio from '../components/CardRadio';
import Title from '../components/Title';

interface Props {
  crusts: Crust[],
  setOrderCrust: (crust: Crust) => void
}

export default function ChooseCrust({crusts, setOrderCrust}: Props) {
  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (name: string) => {
    setSelectedValue(name);
  };

  const useStyles = makeStyles(() => ({
    button: {
      margin: '30px 0'
    }
  }));
  const classes = useStyles();

  function getSelectedCrust() {
    return crusts.find(c => c.name === selectedValue);
  }

  function setCrust() {
    const selectedCrust = getSelectedCrust();
    if(selectedCrust) {
      setOrderCrust(selectedCrust);
      history.push(Routes.Ingredients);
    }
  }

  return (
    <Box>
      <Title title="Choose a Pizza Crust" />
      <Grid container direction="row" justify="space-evenly" spacing={2}>
        {crusts.map(crust => {
          return <Grid item xs={6} key={crust.id}>
            <CardRadio
              option={crust}
              imageSrc={crust.imageSrc}
              imageHeight={'72px'}
              selectedValue={selectedValue}
              handleChange={() => handleChange(crust.name)}
            />
          </Grid>
        })}
      </Grid>
      <Button
        className={classes.button}
        onClick={setCrust}
        variant="contained"
        color="primary"
      >Next</Button>
    </Box>
  )
};
