import React from 'react';
import styled, { css } from 'styled-components'
import Colors from '../utils/Colors';

export const ButtonCss = css`
  border-radius: 5px;
  border: none;
  padding: 20px 25px;
  margin: 0;
  text-decoration: none;
  outline: none;
  background: ${Colors.btnBg};
  color: ${Colors.btnTxt};
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  min-width: 110px;
  border: 1px solid ${Colors.btnBorder};
  &:hover{
    background-color: ${Colors.btnHover};
  }
  ${props => props.selected ? css`
    background-color: ${Colors.btnSelected};
    color: ${Colors.white};
    border: none;
    &:hover{
      color:${Colors.btnTxt};
      border: 1px solid ${Colors.btnBorder};
    }
  ` : null}

${props => props.btnType === 'secondary'? css`
    background-color: ${Colors.btn2Bg};
    color: ${Colors.btn2Txt};
    border-radius: 50px;
    padding: 10px 25px;
    &:hover{
      background-color: ${Colors.btn2HoverBg};
    }
`: null};

${props => props.disabled && props.btnType === 'secondary' ? css`
    color: ${Colors.btn2DisableTxt};
    background-color: ${Colors.btn2DisableBg};
    &:hover{
      background-color: ${Colors.btn2DisableBg};
      cursor: not-allowed;
    }
`: null};

`;

const CustomButton = styled.button`
  ${ButtonCss};
`;

const Button = ({className, children, disabled, btnType, selected, onClick, props}) => {
  return (
  <CustomButton className={className} disabled={disabled} btnType={btnType} selected={selected} onClick={onClick} props={props}>{children}</CustomButton>
  )
}

export default Button;