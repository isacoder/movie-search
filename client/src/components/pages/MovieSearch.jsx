import React from 'react';
import styled from 'styled-components'

const Container = styled.div``;
const Header = styled.header``;
const InnerContainer = styled.div``;

const MovieSearch = ({props}) => {
  return(
    <Container>
      <Header>
        <div className='logo'></div>
        <h1>The Movie Finder Widget</h1>
      </Header>
      <InnerContainer>
        <div className='search-bar-section'></div>
        <div className='filter-type-section'></div>
        <div className='item-list'>
          <div className='movie-card' poster_url='' title='The Lion King' type='movie' date='' gender='male' overview='' popularity='' trailer_path='' ></div>
        </div>
      </InnerContainer>
    </Container>
  );
}

export default MovieSearch;