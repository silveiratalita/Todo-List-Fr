import React, { useState } from 'react';
import CheckIcon from '.././../assets/check.png';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Text
} from './styles';
function Checkbox({ children, ...props }) {
  function handleCheckboxChange() {
    props.check();
  }

  return (
    <CheckboxContainer checked={props.checked} onClick={handleCheckboxChange}>
      <HiddenCheckbox onChange={handleCheckboxChange} checked={props.checked} />
      <StyledCheckbox checked={props.checked}>
        <img alt="tick icon" style={{ width: '15px' }} src={CheckIcon} />
      </StyledCheckbox>
      <Text checked={props.checked}>{children}</Text>
    </CheckboxContainer>
  );
}
export default Checkbox;
