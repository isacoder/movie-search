import React, {useState, useCallback} from 'react';
import styled from 'styled-components'
import {MainLogo} from '../utils/svg/index';
import Colors from '../utils/Colors';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import MovieCard from '../organisms/MovieCard';

const Container = styled.div`
  max-width: 1500px;
  margin: auto;
`;

const Header = styled.header`
  background-color:  ${Colors.blue};
  padding: 36px 32px 32px 52px;
  text-align: left;
`;

const InnerContainer = styled.div`
  padding: 0 45px;
`;

const ItemsSearch = styled(SearchBar)`
  margin: 50px 0 35px 0;
`;

const Logo = styled(MainLogo)`
  height: 70px;
  width: auto;
`;

const FilterBtn = styled(Button)``;

const FilterSection = styled.section`
  text-align: left;
  ${FilterBtn} {
    margin-right: 30px;
  }
`;

const MovieCardList = styled.ul`
  list-style-type: none;
  margin: 30px 0 0 0 ;
  padding: 0;
  li{
    border-top: 1px solid ${Colors.lightBlue};
    padding: 30px 0;
  }
`;


const MovieSearch = ({props}) => {
  const [selectedType, setSelectedType] = useState('all');

  const handleType = useCallback( (type) => {
      setSelectedType(type);
    },[]);

    const handleSearchBar = useCallback((keyEvent)=> (newValue) => {
      console.log("Buscando " + newValue + "...");
    },[]);

  return(
    <Container>
      <Header>
        <Logo/>
      </Header>
      <InnerContainer>
        <ItemsSearch name={'itemSearch'} placeholder={'Search for movies, tv shows or people...'} handleSearch={handleSearchBar('Search..')}></ItemsSearch>
        <FilterSection>
          <FilterBtn selected={selectedType === 'all'} onClick={()=>handleType('all')} >All</FilterBtn>
          <FilterBtn selected={selectedType === 'movies'} onClick={()=>handleType('movies')}>Movies</FilterBtn>
          <FilterBtn selected={selectedType === 'tv'} onClick={()=>handleType('tv')}>TV Shows</FilterBtn>
          <FilterBtn selected={selectedType === 'people'} onClick={()=>handleType('people')}>People</FilterBtn>
        </FilterSection>
        <MovieCardList>
          <li>
            <MovieCard/>
          </li>
          <li>
            <MovieCard/>
          </li>
        </MovieCardList>
      </InnerContainer>
    </Container>
  );
}

export default MovieSearch;