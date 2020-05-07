import React,{useState}  from 'react';
import styled from 'styled-components'
import Colors from '../utils/Colors';
import { textSize, fontSize } from '../utils/Fonts';
import UserScore from '../molecules/UserScore';
import Button from '../atoms/Button';
import VideoModal from '../molecules/VideoModal';

const Container = styled.div`
  display: flex;
  text-align: left;
  font-size: ${fontSize.normal};

`;

const Poster = styled.div`
  max-height: 360px;
  margin-right: 30px;
  img{
    height: 100%;
    width: auto;
    max-width: 300px;
    box-shadow: 0px 10px 80px -23px rgba(0,0,0,0.75);
  }
`;

const PlaceholderImg = styled.div`
  height: 360px;
  width: 240px;
  margin-right: 30px;
  background-color: ${Colors.lightGray2};
  color: ${Colors.darkGrayBlue};
  font-size: ${textSize.h2Size};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 10px 80px -23px rgba(0,0,0,0.75);
`;

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const TopInfo = styled.div``;

const Description = styled.div`
  color: ${Colors.txt};
  line-height: 1.6;
  max-height: 276px;
  overflow: hidden;
  margin: 20px 0;
`;

const BottomInfo = styled.div`
  grid-area: bottom-info;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 160px;
  };
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
  display: inline-block;
`;

const CardLabel = styled.label`
  border: 1px solid ${Colors.labelBorder};
  padding: 6px 10px; 
  border-radius: 4px;
  margin-right: 18px;
  display: inline-block;
  text-transform: capitalize;
  color: ${Colors.labelTxt};
`;

const PlayVideo = styled(Button)`
  max-height: 60px;
`;

export const exampleMovie = {
  id: "123",
  title: 'My Awesome Example Movie',
  year: '2020',
  poster_url: 'https://placekitten.com/200/286',
  date: '10/10/2000',
  type: 'movie',
  gender: 'female',
  overview: 'This movie starts with a girl losing her job but is not a tragic story is a light comedy full of videogames, coding projects and delicious food.',
  score: '84',
  trailer_url: 'https://youtube.com/embed/?QH2-TGUlwu4'
}


export const defaultMovie = {
  id: "",
  title: "",
  year: "",
  poster_url: "",
  date: "",
  type: "",
  gender: "",
  overview: "",
  score: "",
  trailer_url: "",
}


const MovieCard = ({ data, props }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const info = data || defaultMovie;
  let subtitleInfo, cardLabel;


  switch (info.type) {
    case "movie":
      subtitleInfo = `Release date: ${info.date}`;
      cardLabel = "Movie";
      break;
    case "tv":
      subtitleInfo = `First air date: ${info.date}`;
      cardLabel = "Tv Show";
      break;
    case "person":
      subtitleInfo = `Gender: ${info.gender}`;
      cardLabel = "People";
      break;
    default:
      subtitleInfo = "";
      cardLabel = "";
  }

    const handleVideoPlayer = (openState) =>{
      setIsModalOpen(openState);
    }

  return (
    <Container>
      {isModalOpen && <VideoModal title={info.title} url={info.trailer_url} handleModal={handleVideoPlayer}/>}
      <Poster>{info.poster_url ? <img src={info.poster_url} alt='item-poster' /> : <PlaceholderImg>Poster Not Available</PlaceholderImg>}</Poster>
      <InforContainer>
        <TopInfo>
          <TitleContainer><Title>{info.title}</Title><Year>{info.year ? '(' + info.year + ')' : ''}</Year></TitleContainer>
          {cardLabel && <CardLabel>{cardLabel}</CardLabel>}
          {subtitleInfo && <Subtitle>{subtitleInfo}</Subtitle>}
          <Description>{info.overview}</Description>
        </TopInfo>

        {info.type !== "person" && <BottomInfo>
          <UserScore value={info.score}>{info.score}</UserScore>
          <PlayVideo  disabled={!info.trailer_url} btnType='secondary' onClick={() => handleVideoPlayer(true)}>&#9658; Play video</PlayVideo>
        </BottomInfo>}
      </InforContainer>
    </Container>
  );
}

export default MovieCard;