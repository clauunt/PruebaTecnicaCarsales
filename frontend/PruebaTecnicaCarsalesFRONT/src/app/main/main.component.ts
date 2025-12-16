import { Component, inject } from '@angular/core';
import { NavigationStart, RouterModule } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { HeaderComponent } from '../layout/header/header.component';
import { AlertDisplayComponent } from '@shared/components/errors/alert-display';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterModule, HeaderComponent, AlertDisplayComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
})
export class MainComponent {
  private routerSub: Subscription;

  constructor(public alertService: AlertService, private router: Router) {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.hide();
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
