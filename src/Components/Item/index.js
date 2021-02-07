import React from 'react';
import { Grid } from './styles';
import Checkbox from '../Checkbox';

function Item({ idx, task, handlerStatus }) {
  return (
    <div id={task.id} idx={idx}>
      <Grid>
        <Checkbox checked={task.checked} check={handlerStatus(task, idx)}>
          {task.status}
        </Checkbox>
        <strong style={{ margin: '3px', alignContent: 'center' }}>
          nome: {task.name}
        </strong>
        <strong>email: {task.email}</strong>
        <strong>descrição: {task.description}</strong>
      </Grid>
    </div>
  );
}

export default Item;
