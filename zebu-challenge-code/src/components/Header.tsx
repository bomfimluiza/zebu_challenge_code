import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
  
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props: Props) {
  const useStyles = makeStyles(() => ({
    container: {
      alignItems: 'center',
      backgroundColor: '#020819',
      color: 'white',
      maxWidth: 'inherit',
      right: 'auto'
    },
    brand: {
      margin: '0',
      marginLeft: '5px',
      fontWeight: 900
    },
    image: {
      height: '25px'
    }
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.container}>
          <Toolbar>
            <img className={classes.image} src="zebu_logo.svg" alt="Zebu logo" />
            <Typography variant="h6" className={classes.brand}>PIZZA</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar/>
      <Container>
        {props.children}
      </Container>
    </React.Fragment>
  )
};
