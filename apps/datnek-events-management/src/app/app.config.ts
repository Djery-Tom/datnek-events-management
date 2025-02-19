import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CoverImageInputComponent } from './fields/cover-image-input/cover-image-input.component';
import { provideStore } from '@ngxs/store';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatabaseService, EventState } from '@datnek-events-management/events';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(localeFr, 'fr');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('fr');
    return translate.use('fr');
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      FormlyModule.forRoot({
        types: [
          { name: 'cover-image-input', component: CoverImageInputComponent },
        ],
      }),
      FormlyBootstrapModule,
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    importProvidersFrom(InMemoryWebApiModule.forRoot(DatabaseService, {passThruUnknownUrl: true})),
    provideStore([EventState]),
    provideAnimations(),
    provideToastr(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
};
