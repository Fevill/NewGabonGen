import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ControlContainer, FormBuilder,FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AccueilModule } from './accueil/accueil.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import "reflect-metadata";
import { ClanService, ElectronService, PersonneService } from './core/services';
import { SexefilterPipe } from './pipe/sexefilter.pipe';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SexefilterPipe],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AccueilModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FormBuilder,ClanService,PersonneService,ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {}
