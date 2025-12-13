import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  menuOpen = signal(true);

  optionsDir = [
    { label: 'Inicio', path: '/home' },
    { label: 'Personajes', path: '/characters' },
    { label: 'Episodios', path: '/episodes' }
  ];

  toggle() {
    this.menuOpen.update(v => !v);
  }

  close() {
    this.menuOpen.set(false);
  }
}
