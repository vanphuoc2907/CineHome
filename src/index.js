import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoryProvider';
import { ActorsProvider } from './context/ActorProvider';
import { AuthorsProvider } from './context/AuthorProvider';
import { CharactersProvider } from './context/CharacterProvider';
import { NotificationProvider } from './context/NotificationProvider';
import { PlansProvider } from './context/PlanProvider';
import { PackagesProvider } from './context/PackageProvider';
import { FeaturesProvider } from './context/FeatureProvider';
import { MoviesProvider } from './context/MovieProvider';
import { EpisodesProvider } from './context/EpisodeProvider';
import { TrailersProvider } from './context/TrailerProvider';
import { AccountsProvider } from './context/AccountProvider';
import AuthProvider from './context/AuthProvider';
import { UserpagesProvider } from './context/UserpageProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoriesProvider>
        <ActorsProvider>
          <AuthorsProvider>
            <CharactersProvider>
              <NotificationProvider>
                <PlansProvider>
                  <PackagesProvider>
                    <FeaturesProvider>
                      <MoviesProvider>
                        <EpisodesProvider>
                          <TrailersProvider>
                            <AccountsProvider>
                              <AuthProvider>
                                <UserpagesProvider>
                                  <App />
                                </UserpagesProvider>
                              </AuthProvider>
                            </AccountsProvider>
                          </TrailersProvider>
                        </EpisodesProvider>
                      </MoviesProvider>
                    </FeaturesProvider>
                  </PackagesProvider>
                </PlansProvider>
              </NotificationProvider>
            </CharactersProvider>
          </AuthorsProvider>
        </ActorsProvider>
      </CategoriesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
