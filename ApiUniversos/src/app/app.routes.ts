
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CharactersComponent } from './pages/characters/characters';
import { CharacterDetailComponent} from './pages/character-detail/character-detail';
import { DigimonComponent } from './pages/digimon/digimon';
import { DigimonDetailComponent} from './pages/digimon-detail/digimon-detail';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'characters/:id',
    component: CharacterDetailComponent
  },

  { path: 'digimon', component: DigimonComponent },
  { path: 'digimon/:id', component: DigimonDetailComponent },
  {
    path: '**',
    redirectTo: ''
  }
];
