import React from 'react';
import styled from 'styled-components'
import { textSize } from '../utils/Fonts';
import Colors from '../utils/Colors';

const Container = styled.div``;
const Label = styled.label`
  color: ${Colors.blue};
  font-size: ${textSize.pSize};
`;

const Score = styled.span`
  color: ${Colors.darkBlue};
  font-weight: 800;
`;

const Bar = styled.div`
  width: 305px;
  background-color: ${Colors.barBg};
  border-radius: 20px;
  overflow: hidden;
  margin-top: 14px;
  height: 12px;
`;

const Progress = styled.div`
  width: ${props => props.percentage};
  background-color: ${props => props.bgColor};
  padding: 6px;
`;


const UserScore = ({ value, props }) => {

  const percent = (isNaN(value) || value === '') ? 'Not Rated' : value + '%';
  let progressBg;

  if (value < 21) {
    progressBg = Colors.barProgressRed;
  } else if (value < 51) {
    progressBg = Colors.barProgressYellow;
  } else {
    progressBg = Colors.barProgressGreen;
  }

  return (
    <Container>
      <Label>User Raiting: </Label>
      <Score>{percent}</Score>
      <Bar>
        {(percent !== 'Not Rated') && <Progress percentage={percent} bgColor={progressBg} />}
      </Bar>
    </Container>
  );
}

export default UserScore;