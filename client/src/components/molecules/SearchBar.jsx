import React, {useState, useCallback} from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
import {fontSize} from '../utils/Fonts';
import {SearchIcon} from '../utils/svg/index';

const Container = styled.div`
  height: 70px;
  display: flex;
  StyledIcon{
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 35px;
  }
`;

const IconBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    height: 25px;
    width: 25px;
  }
`;

const ClearBtn = styled.button`
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${Colors.clearBtnTxt};
  position: absolute;
  top: 50%;
  right: 20px;
  font-size: ${fontSize.small};
  margin: -6px;
  padding: 2px;
  &:hover{
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  padding: 20px 30px 20px 55px;
  display: inline-block;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid ${Colors.inputBorder};
  box-sizing: border-box;
  outline: none;
  color: ${Colors.inputTxt};
  background-color: ${Colors.searchNoFocusBg};
  font-size: ${fontSize.normal};
  ::placeholder {
    color: ${Colors.inputPlaceholder};
  }
  &:focus{
    background-color: ${Colors.searchFocusBg};
    color: ${Colors.inputTxt};
    border: 1px solid ${Colors.inputFocusBorder};
  }
`;

const SearchBtn = styled.button`
  height: 100%;
  border-top: 1px solid ${Colors.inputBorder};
  border-right: 1px solid ${Colors.inputBorder};
  border-bottom: 1px solid ${Colors.inputBorder};
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px 20px;
  margin: 0;
  width: 190px;
  text-decoration: none;
  outline: none;
  box-shadow: inset 0px -20px 60px -60px rgba(0,0,0,0.75);
  color: ${Colors.searchBtnTxt};
  background-color: ${Colors.searchBtnBg};
  font-size: ${fontSize.normal};
  &:hover{
    cursor: pointer;
    box-shadow: none;
    background-color: ${Colors.searchBtnHoverBg};
  }
  &:active{
    box-shadow: inset 0px 90px 20px -99px rgba(23,52,74,1);
    background-color: ${Colors.searchBtnActiveBg};
  }
`;

const SearchBar = ({className, handleSearch, type, name, value = '', placeholder, onChange, ...props}) => {

  const [searchPlaceholder, setSearchPlaceholder] = useState(placeholder);
  const [inputValue, setInputValue] = useState(value); 

  const handleSubmit = useCallback((keyEvent) => {
    var code = keyEvent.keyCode || keyEvent.which;
    if(code === 13 && handleSearch) {
      handleSearch(inputValue);
    }
    console.log("this is the key event: ", code);
  },[inputValue]);


  return(
    <Container className={className}>
      <InputBox>
        <IconBox><SearchIcon/></IconBox>
        <SearchInput
            id={name}
            name={name}
            value={inputValue}
            type={type} 
            placeholder={searchPlaceholder} 
            onKeyDown={(event) => {handleSubmit(event)}}
            onChange={(event) => {setInputValue(event.target.value);}}
            onFocus={() => {setSearchPlaceholder('')} }
            onBlur = { () => {setSearchPlaceholder(placeholder)}}
            props={props}
        ></SearchInput>
        {inputValue !== '' ? <ClearBtn onClick={() => {setInputValue('')}}>Clear</ClearBtn> : null}
      </InputBox>

      <SearchBtn onClick={() => {handleSearch && handleSearch(inputValue)} }>Search</SearchBtn>
    </Container>
  );
}

export default SearchBar;