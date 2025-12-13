import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'characters', loadComponent: () => import('./features/characters/components/character-list/character-list.component').then(m => m.CharacterListComponent) },
  { path: 'episodes', loadComponent: () => import('./features/episodes/components/episode-list/episode-list.component').then(m => m.EpisodeListComponent)},
  { path: 'home', loadComponent: () => import('././layout/home/home').then(m => m.HomeComponent) },
  { path: '**', redirectTo: 'home' }
];
