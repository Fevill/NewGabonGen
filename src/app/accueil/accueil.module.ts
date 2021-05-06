import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil.component';
import { SharedModule } from '../shared/shared.module';
import { GraphiqueComponent } from './graphique/graphique/graphique.component';
import { ListeComponent } from './liste/liste/liste.component';
import { PersonneFormComponent } from './formulaires/personne-form/personne-form.component';
import { ClanFormComponent } from './formulaires/clan-form/clan-form.component';
import { ElectronService } from 'ngx-electron';
import { ChartTextComponent } from './graphique/chart-text/chart-text.component';
import { EtapeOneComponent } from './formulaires/personne-form/etape-one/etape-one.component';
import { EtapeTwoComponent } from './formulaires/personne-form/etape-two/etape-two.component';
import { EtapeThreeComponent } from './formulaires/personne-form/etape-three/etape-three.component';
import { EtapeFourComponent } from './formulaires/personne-form/etape-four/etape-four.component';
import { EtapeFiveComponent } from './formulaires/personne-form/etape-five/etape-five.component';
import { EtapeSixComponent } from './formulaires/personne-form/etape-six/etape-six.component';
import { SuppressionFormComponent } from './formulaires/suppression-form/suppression-form.component';
import { InputListComponent } from './formulaires/personne-form/input-list/input-list.component';
import { GojsAngularModule } from 'gojs-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AccueilComponent,
     GraphiqueComponent, 
     ListeComponent, 
     PersonneFormComponent, 
     ClanFormComponent, 
     ChartTextComponent, 
     SuppressionFormComponent,
     ClanFormComponent,
     EtapeOneComponent,
     EtapeTwoComponent,
     EtapeThreeComponent,
     EtapeFourComponent,
     EtapeFiveComponent,
     EtapeSixComponent,
     InputListComponent],
  imports: [CommonModule, FormsModule,  BrowserModule,
    FormsModule,
    ReactiveFormsModule,SharedModule, AccueilRoutingModule, GojsAngularModule],
  providers: [ElectronService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AccueilModule {}
