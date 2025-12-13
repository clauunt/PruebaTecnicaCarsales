import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-info">
      <span>Rick and Morty</span><br>
      <img style="width: 1000px;" src="https://www.rockandpop.cl/wp-content/uploads/2018/09/original-2.jpg" alt="Rick and Morty">
    </div>
  `,
  styles: [
    `
    .home-info {
      text-align: center;
      padding: 16px;
      color:rgb(42, 42, 42);
      font-size: 70pt;
    }
    `
  ]
})
export class HomeComponent { }
