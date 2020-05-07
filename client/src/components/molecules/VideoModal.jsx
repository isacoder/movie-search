import React from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
import {textSize} from '../utils/Fonts';

const Container = styled.div`
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  z-index: 1010;
  display: flex;
  flex-direction: column;
  background-color: pink;
  background-color: ${Colors.blue};
  border-radius: 4px;
  padding: 10px;
`;

const CloseButton = styled.button`
  padding: 10px;
  margin: 0;
  text-decoration: none;
  outline: none;
  color: ${Colors.lightBlue};
  font-size: ${textSize.pSize};
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 50px;
  border: none;
  &:hover{
    color: ${Colors.lightGray3};
  }
`;

const Overlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.overlayBg};
`;

const TitleSection = styled.div`
  color: ${Colors.white};
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

const Title = styled.div``;

const ModalVideo = ({title, url, handleModal, props}) => {

  return(
    <Container>
      <Overlay/>
      <VideoContainer>
        <TitleSection>
          <Title>{title}</Title>
          <CloseButton onClick={() => handleModal(false)}>&#10005;</CloseButton>
        </TitleSection>

        <iframe title={title} width="420" height="315" src={url}></iframe>
      </VideoContainer>
    </Container>
  );
}

export default ModalVideo;