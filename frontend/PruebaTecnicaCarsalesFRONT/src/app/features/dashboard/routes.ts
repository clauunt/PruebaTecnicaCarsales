import { Routes } from "@angular/router";
import { CharacterListComponent } from "./characters/components/character-list/character-list.component";
import { EpisodeListComponent } from "./episodes/components/episode-list/episode-list.component";
import { HomeComponent } from "./home/home";

export default [
    { path: '', component: HomeComponent },
    { path: 'characters', component: CharacterListComponent },
    { path: 'episodes', component: EpisodeListComponent },
] as Routes;