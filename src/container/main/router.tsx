import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import Layout from './components/layout';
import MainPage from './components/main-page';
import DetailPageKab from '../detail-kaban';
import DetailPageMonk from '../detail-monkey';
import DetailPageHero from '../detail-hero';
// import Promo from '../promo';
import Collection from '../collection';
import CreateNFT from '../create-nft';
import Contacts from '../contact';
import AuthContainer from '../auth';
import UserCenterContainer from '../user-center';
import NotFoundPage from '../404';

export const router = createBrowserRouter([
  {
    path: getNavigationValue('project-monday.main'),
    element: <Layout />,
    children: [
      {
        path: getNavigationValue('project-monday.main'),
        element: <MainPage />
      },
      {
        path: getNavigationValue('project-monday.detail-kaban'),
        element: <DetailPageKab />
      },
      {
        path: getNavigationValue('project-monday.detail-monkey'),
        element: <DetailPageMonk />
      },
      {
        path: getNavigationValue('project-monday.detail-hero'),
        element: <DetailPageHero />
      },
      {
        path: getNavigationValue('project-monday.collection'),
        element: <Collection />
      },
      {
        path: getNavigationValue('project-monday.create-nft'),
        element: <CreateNFT />
      },
      {
        path: getNavigationValue('project-monday.contact'),
        element: <Contacts />
      },
      {
        path: getNavigationValue('project-monday.auth'),
        element: <AuthContainer />
      },
      {
        path: getNavigationValue('project-monday.user-center'),
        element: <UserCenterContainer />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);