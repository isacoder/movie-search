import React from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
import {textSize, fontSize} from '../utils/Fonts';
import UserScore from '../molecules/UserScore';
import Button from '../atoms/Button';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px  1fr;
  grid-template-rows: 120px 170px 70px;
  grid-template-areas:
  "poster top-info"
  "poster mid-info"
  "poster bottom-info";
  justify-items: start;
  text-align: left;
`;

const Poster = styled.div`
  grid-area: poster;
  max-height: 360px;
  margin-right: 30px;
  img{
    height: 100%;
    width: auto;
    max-width: 300px;
    box-shadow: 0px 10px 80px -23px rgba(0,0,0,0.75);
  }
`;
const TopInfo = styled.div`
  grid-area: top-info;
`;
const MidInfo = styled.div`
  grid-area: mid-info;
  color: ${Colors.txt};
`;
const BottomInfo = styled.div`
  grid-area: bottom-info;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const TitleContainer = styled.div`
  margin-bottom: 10px;
  display: block;
`;

const Year = styled.span`
  color: ${Colors.darkGrayBlue};
  font-size: ${fontSize.big};
  margin-left: 10px;
`;

const Title = styled.h2`
  font-size: ${textSize.h2Size};
  color: ${Colors.darkBlue};
  display: inline;
`;

const Subtitle = styled.div`
  color: ${Colors.darkGrayBlue};
  font-size: ${textSize.psize};
  display: inline-block;
`;

const CardLabel = styled.label`
  border: 1px solid ${Colors.labelBorder};
  padding: 10px; 
  border-radius: 4px;
  margin-right: 18px;
  display: inline-block;
  text-transform: capitalize;
  color: ${Colors.labelTxt};
`; 

const PlayVideo = styled(Button)`
  max-height: 60px;
`;

export const defaultMovie = {
  title:'My Awesome example Movie',
  year:'2020',
  poster_url:'https://placekitten.com/200/286',
  date:'10/10/2000',
  type:'movie',
  gender: 'female',
  overview:'This movie starts with a girl losing her job but is not a tragic story is a light comedy full of videogames, coding projects and delicious food.',
  score:'84',
  trailer_url:'https://www.youtube.com/watch?v=Jc8uLzQVnyE'
}



const MovieCard = ({data, props}) => {

  const info = data || defaultMovie;
  let subtitleInfo;

  switch(info.type){
    case "movie":
        subtitleInfo = "Release date: " + info.date;
        break;
    case "tv":
        subtitleInfo = "First air date: " + info.date;
        break;
    case "people":
        subtitleInfo = "Gender: " + info.gender;
        break;
  }


  return(
    <Container>
      <Poster><img src={info.poster_url} alt='item-poster'/></Poster>
      <TopInfo>
        <TitleContainer><Title>{info.title}</Title><Year>{info.year ? '(' + info.year + ')' : ''}</Year></TitleContainer>
        <CardLabel>{info.type}</CardLabel>
        <Subtitle>{subtitleInfo}</Subtitle>
      </TopInfo>
      <MidInfo>{info.overview}</MidInfo>
      <BottomInfo>
        <UserScore value={info.score}>{info.score}</UserScore>
        <PlayVideo url={info.trailer_url} disabled={!info.trailer_url} btnType='secondary'>&#9658; Play video</PlayVideo>
      </BottomInfo>
    </Container>
  );
}

export default MovieCard;