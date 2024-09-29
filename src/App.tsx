import React, { Suspense, lazy } from 'react';
import './styles/globals.css';
import Loader from './components/Globals/Loader';
import PokemonDetail from './pages/PokemonDetail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokemon/:name',
    element: <PokemonDetail />,
  },
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;