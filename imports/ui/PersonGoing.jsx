import React from 'react';
import Chip from '@material-ui/core/Chip';




export const PersonGoing = ({ name }) => {

  return (

      <Chip label={name} color="primary" />
  );
};