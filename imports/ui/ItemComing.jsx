import React from 'react';
import Chip from '@material-ui/core/Chip';




export const ItemComing = ({ task, onCheckboxClick, onDeleteClick  }) => {
    const text = `${task.text} (${task.name})`;

  return (
      <Chip color="secondary" label={text} />
  );
};