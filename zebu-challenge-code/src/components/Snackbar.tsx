import React from 'react';
import { Box, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  open: boolean,
  message: string,
  handleClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void
}

export default function SimpleSnackbar({open, message, handleClose}: Props) {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
}