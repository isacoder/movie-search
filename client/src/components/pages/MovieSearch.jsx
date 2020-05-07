import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import { MainLogo } from '../utils/svg/index';
import Colors from '../utils/Colors';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import MovieCard from '../organisms/MovieCard';
import { getMovies, getTvTrailer, getMovieTrailer } from '../actions/api';
import { textSize } from '../utils/Fonts';

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

const DefaultView = styled.h2`
  margin: 100px auto;
  color: ${Colors.lightGray};
  font-size: ${textSize.h2Size};
  font-weight: 400;
`;

const NoResults = styled.h2`
  margin: 100px auto;
  color: ${Colors.lightGray3};
  font-size: ${textSize.h2Size};
  font-weight: 400;
`;

const transformDate = (dateText) => {
  if (!dateText) return "";
  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const date = new Date(dateText);
  const dateArray = dateFormat.formatToParts(date);
  const formatedDate = `${dateArray[4].value}/${dateArray[0].value}/${dateArray[2].value}`;
  const dateValues = { year: dateArray[4].value, fullDate: formatedDate };
  return dateValues;
}

const MovieSearch = ({ props }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState('');

  const loadMovies = useCallback(async (loadValue) => {
    setLoading('movies-load');
    if (loadValue === '') {
      setMovies([]);
      return;
    }

    console.log(loadValue, 'Loading movies');

    try {
      const allMovies = await getMovies(loadValue);
      console.log(allMovies, 'result movies list');

      const formatedMovies = allMovies.map((movie, index) => {
        const rawDate = movie.release_date ? movie.release_date : movie.first_air_date;
        const date = transformDate(rawDate);
        const genderInt = parseInt(movie.gender);
        const genderTxt = (genderInt === 1) ? 'Female' : (genderInt === 2 ? 'Male' : 'Not Specified');
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : (movie.profile_path ? `https://image.tmdb.org/t/p/w500/${movie.profile_path}` : "");

        // let video_url;

        // if(movie.media_type === 'tv'){
        //   video_url = await getTvTrailer(movie.id);
        // }else if(movie.media_type === 'movie'){
        //   video_url = await getMovieTrailer(movie.id);
        // }
        //   console.log(video_url, 'video url');

        return ({
          id: movie.id,
          title: movie.name ? movie.name : movie.title,
          year: date.year ? date.year : "",
          poster_url: posterPath,
          date: date.fullDate ? date.fullDate : "",
          type: movie.media_type,
          gender: genderTxt,
          overview: movie.overview ? movie.overview : "",
          score: movie.vote_average ? parseFloat(movie.vote_average) * 10 : "",
          trailer_url: "",
        })
      });

      setMovies(formatedMovies);
    } catch (error) {
      console.log(error, "Couldn't load movies");
    }
    setLoading('');
  }, []);

  const handleType = useCallback((type) => {
    setSelectedType(type);
  }, []);

  const handleSearchBar = useCallback((keyEvent) => (newValue) => {
    setSearchValue(newValue);
    loadMovies(newValue);
  }, [loadMovies]);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredMovies(movies);
    } else {
      const updatedFilter = movies.filter((movie, index) => {
        return movie.type === selectedType;
      });
      setFilteredMovies(updatedFilter);
    }
    return () => {
      setFilteredMovies(movies);
    }
  }, [movies, selectedType]);

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <InnerContainer>
        <ItemsSearch name={'itemSearch'} placeholder={'Search for movies, tv shows or people...'} handleSearch={handleSearchBar('Search..')}></ItemsSearch>
        <FilterSection>
          <FilterBtn selected={selectedType === 'all'} onClick={() => handleType('all')} >All</FilterBtn>
          <FilterBtn selected={selectedType === 'movie'} onClick={() => handleType('movie')}>Movies</FilterBtn>
          <FilterBtn selected={selectedType === 'tv'} onClick={() => handleType('tv')}>TV Shows</FilterBtn>
          <FilterBtn selected={selectedType === 'person'} onClick={() => handleType('person')}>People</FilterBtn>
        </FilterSection>
        {searchValue === '' ? <DefaultView>Add a search value to see movies...</DefaultView> :
          filteredMovies.length && loading !== '' ? <DefaultView>Loading ...</DefaultView> :
            filteredMovies.length > 0 ? <MovieCardList>
              {filteredMovies.map((movieData, index) => {
                return (<li key={`movie-item-${index}`} ><MovieCard data={movieData} /></li>)
              })
              }
            </MovieCardList> : <NoResults>No results available for that query</NoResults>
        }
      </InnerContainer>
    </Container>
  );
}

export default MovieSearch;