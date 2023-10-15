import React from 'react';
import Header from '../pages/main/components/Header';
import { DivBodyStyled } from '../pages/main/Main.styled';
import MainPageContent from '../pages/main/components/MainPageContent'
import Container from 'react-bootstrap/Container';

const Main = () => {
  return (
    <Container>
      <DivBodyStyled>
        <Header />
        <MainPageContent />
      </DivBodyStyled>
    </Container>
  )

}

export default Main;