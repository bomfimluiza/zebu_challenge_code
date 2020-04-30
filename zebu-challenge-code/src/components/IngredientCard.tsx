import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface Props {
  name: string,
  imgSrc: string,
  quantity: number,
  canAdd: boolean,
  onRemove: () => void,
  onAdd: () => void
}

export default function IngredientCard({name, imgSrc, quantity, canAdd, onRemove, onAdd}: Props) {
  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
      padding: '5px 8px'
    },
    button: {
      padding: '5px'
    },
    quantity: {
      width: '35px'
    },
    image: {
      width: '35px',
      margin: '0 8px'
    }
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <IconButton
        disabled={quantity === 0}
        onClick={onRemove}
        color="primary"
        className={classes.button}
      ><RemoveIcon/></IconButton>
      <p className={classes.quantity}><strong>{quantity}</strong></p>
      <IconButton
        disabled={!canAdd}
        onClick={onAdd}
        color="primary"
        className={classes.button}
      ><AddIcon/></IconButton>
      <img className={classes.image} src={imgSrc} alt={imgSrc} />
      <p>{name}</p>
    </Paper>
  )
};
