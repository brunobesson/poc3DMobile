import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements as defineWidget3d } from '@sdk3d/3d-widget/loader';
import { defineCustomElements as defineWebUI } from '@se/web-ui/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


defineWidget3d(window);
defineWebUI(window);
