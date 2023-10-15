import { RouterProvider } from "react-router-dom";
import './App.css';
import PublicRouter from './routes/PublicRouter';
import React, { useState }  from 'react';
import LoadingPage from "./pages/loading/Loading";
import LoadingContext from "./context/LoadingContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {isLoading && (
        <LoadingPage />
      )}
      <RouterProvider router={PublicRouter} />
    </LoadingContext.Provider>
  );
}

export default App;
