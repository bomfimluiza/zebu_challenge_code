import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Header from './Header';

interface Props {
  children: React.ReactNode
}

export default function AppFrame({children}: Props) {
  const useStyles = makeStyles(() => ({
    outter: {
      display: 'flex',
      flexFlow: 'col',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CCCCCC'
    },
    inner: {
      width: '100vw',
      maxWidth: '470px',
      maxHeight: '100%',
      overflowY: 'auto',
      height: '100vh',
      overflowX: 'hidden',
      backgroundColor: '#F7F8F9',
    },
    children: {
      textAlign: 'center'
    }
  }));
  const classes = useStyles();

  return (
    <Box className={classes.outter}>
      <Box className={classes.inner}>
        <Header >
          <Box className={classes.children}>
            {children}
          </Box>
        </Header>
      </Box>
    </Box>
  )
};
