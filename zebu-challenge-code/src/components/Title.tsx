import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

interface Props {
  title: string,
  children?: React.ReactNode
}

export default function Title({title, children}: Props) {
  const useStyles = makeStyles(() => ({
    container: {
      margin: '15px 0',
    },
    title: {
      fontWeight: 500
    }
  }));
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.title}>{title}</Typography>
      {children}
    </Box>
  )
};
