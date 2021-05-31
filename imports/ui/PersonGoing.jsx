import React from 'react';
import Chip from '@material-ui/core/Chip';




export const PersonGoing = ({ name }) => {

  return (<div className='center'>

      <Chip label={name} color="primary" />
  </div>);
};