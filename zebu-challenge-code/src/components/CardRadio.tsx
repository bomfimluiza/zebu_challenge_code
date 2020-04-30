import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import Radio, { RadioProps } from '@material-ui/core/Radio';

interface Props {
  option: {
    id: string,
    name: string,
    price: number,
    maxToppings?: number
  },
  imageSrc: string,
  imageHeight: string,
  selectedValue: string,
  handleChange: (selected: string) => void
}

export default function CardRadio({option, imageSrc, imageHeight, selectedValue, handleChange}: Props) {
  const TransparentRadio = withStyles({
    root: {
      display: 'none',
    },
    checked: {},
  })((props: RadioProps) => <Radio color="default" {...props} />);

  const useStyles = makeStyles(() => ({
    card: {
      padding: '15px'
    },
    cardSelected: {
      padding: '15px',
      backgroundColor: '#F6BB0A',
    },
    image: {
      height: imageHeight,
      display: 'flex'
    },
    name: {
      margin: '0',
      marginTop: '10px',
      fontWeight: 800
    }
  }));
  const classes = useStyles();

  const imageWidth = () => {
    if(option.maxToppings) {
      return option.maxToppings * 8 + 'px';
    }
    return '70px';
  }

  return (
    <Paper
      className={option.name === selectedValue ? classes.cardSelected : classes.card}
      onClick={() => handleChange(option.name)}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box className={classes.image}>
          <img src={imageSrc} alt="pizza" width={imageWidth()} />
        </Box>
        <Typography variant="subtitle1" className={classes.name}>{option.name} (${option.price})</Typography>
        <TransparentRadio
          checked={selectedValue === option.name}
          onChange={() => handleChange(option.name)}
          value={option.name}
          name="radio-button-demo"
        />
      </Box>
    </Paper>
  );
}