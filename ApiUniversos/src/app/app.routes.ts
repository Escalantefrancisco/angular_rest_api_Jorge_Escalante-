
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CharactersComponent } from './pages/characters/characters';
import { CharacterDetailComponent} from './pages/character-detail/character-detail';
import { DigimonComponent } from './pages/digimon/digimon';
import { DigimonDetailComponent} from './pages/digimon-detail/digimon-detail';
import { PokemonComponent } from './pages/pokemon/pokemon';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail';


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

  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },

  {
    path: '**',
    redirectTo: ''
  }
];
