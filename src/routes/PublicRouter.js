import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import MainPage from './Main';
import ErrorPage from '../pages/error/Error';

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path:"*",
    element: <ErrorPage />
  }
]);

export default PublicRouter;