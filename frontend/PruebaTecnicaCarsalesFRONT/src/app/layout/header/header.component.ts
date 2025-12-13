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
    { label: 'Personajes', path: '/characters' },
    { label: 'Episodios', path: '/episodes' }
  ];

  toggle(): void {
    this.menuOpen.update(v => !v);
  }

  close(): void {
    this.menuOpen.set(false);
  }
}
