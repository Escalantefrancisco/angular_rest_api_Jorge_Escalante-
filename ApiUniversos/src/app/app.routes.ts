
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CharactersComponent } from './pages/characters/characters';
import { CharacterDetailComponent} from './pages/character-detail/character-detail';
import { DigimonComponent } from './pages/digimon/digimon';
import { DigimonDetailComponent} from './pages/digimon-detail/digimon-detail';
import { PokemonComponent } from './pages/pokemon/pokemon';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail';
import { DemonSlayerDetailComponent } from './components/demon-slayer-detail/demon-slayer-detail';
import { DemonSlayerComponent } from './components/demon-slayer/demon-slayer';



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

  { path: 'demon-slayer',component: DemonSlayerComponent},
  { path: 'demon-slayer/:id',component: DemonSlayerDetailComponent},
  

  {
    path: '**',
    redirectTo: ''
  }
];
