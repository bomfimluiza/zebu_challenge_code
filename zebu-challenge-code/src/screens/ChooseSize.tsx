import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Routes from '../routes';
import Size from '../models/Size';
import { Box, Grid, Button } from '@material-ui/core';
import CardRadio from '../components/CardRadio';
import Title from '../components/Title';

interface Props {
  sizes: Size[],
  setOrderSize: (size: Size) => void
}

export default function ChooseSize({sizes, setOrderSize}: Props) {
  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState('');

  const useStyles = makeStyles(() => ({
    button: {
      margin: '30px 0'
    }
  }));
  const classes = useStyles();

  const handleChange = (name: string) => {
    setSelectedValue(name);
  };

  const getGreaterMaxTopping = () => {
    let greater = 0;
    sizes.forEach(s => {
      if(s.maxToppings > greater) {
        greater = s.maxToppings;
      }
    });
    return greater;
  }

  function getSelectedSize() {
    return sizes.find(s => s.name === selectedValue);
  }

  function setSize() {
    const selectedSize = getSelectedSize();
    if(selectedSize) {
      setOrderSize(selectedSize);
      history.push(Routes.Crust);
    }
  }

  return (
    <Box>
      <Title title="Choose a Pizza Size" />
      <Grid container direction="row" justify="space-evenly" spacing={2}>
        {sizes.map(size => {
          return <Grid item xs={6} key={size.id}>
            <CardRadio
              option={size}
              imageSrc="pizza.svg"
              imageHeight={getGreaterMaxTopping() * 8 + 'px'}
              selectedValue={selectedValue}
              handleChange={() => handleChange(size.name)}
            />
          </Grid>
        })}
      </Grid>
      <Button
        className={classes.button}
        onClick={setSize}
        variant="contained"
        color="primary"
      >Next</Button>
    </Box>
  )
};
