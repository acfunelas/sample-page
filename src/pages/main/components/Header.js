import React from 'react'
import { MainPageHeaderContainerStyled, DivHeaderContainerStyled } from './MainPageContent.styles';

const Header = () => {
  return (
    <DivHeaderContainerStyled>
      <MainPageHeaderContainerStyled>
        <h5 style={{fontWeight: 'bold'}}>PRODUCTS DEMO</h5>
      </MainPageHeaderContainerStyled>
    </DivHeaderContainerStyled>
  )
}

export default Header;