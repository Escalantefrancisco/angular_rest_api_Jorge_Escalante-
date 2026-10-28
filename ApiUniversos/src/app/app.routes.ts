
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { Characters } from './pages/characters/characters';
import { CharacterDetail } from './pages/character-detail/character-detail';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: Characters
  },
  {
    path: 'characters/:id',
    component: CharacterDetail 
  },
  {
    path: '**',
    redirectTo: ''
  }
];
