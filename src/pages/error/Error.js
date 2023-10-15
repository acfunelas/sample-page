import React, { useEffect, useContext } from 'react';
import { ErrorPageContainer } from './Error.styles';
import { Button } from 'react-bootstrap';
import LoadingContext from '../../context/LoadingContext';

const ErrorPage = () => {
  const [,setIsLoading] = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return(
    <ErrorPageContainer>
      <img src="/images/sad.gif" alt="error-404-img" />
      <h5>UH OH. YOU ARE A LOST KITTEN</h5>
      <Button href="/">Back to Home</Button>
    </ErrorPageContainer>
  )
}

export default ErrorPage;