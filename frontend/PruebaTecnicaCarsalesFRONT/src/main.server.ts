import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { MainComponent } from './app/main/main.component';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(MainComponent, config, context);

export default bootstrap;
