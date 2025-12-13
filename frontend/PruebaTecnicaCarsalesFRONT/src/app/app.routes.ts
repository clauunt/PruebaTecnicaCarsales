import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', loadComponent: () => import('./features/characters/components/character-list/character-list.component').then(m => m.CharacterListComponent) },
  { path: 'episodes', loadComponent: () => import('./features/episodes/components/episode-list/episode-list.component').then(m => m.EpisodeListComponent)},
  { path: '**', redirectTo: 'characters' }
];
