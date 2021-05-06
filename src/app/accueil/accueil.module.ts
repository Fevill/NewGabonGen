import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanFormComponent } from './formulaires/clan-form/clan-form.component';
import { PersonneFormComponent } from './formulaires/personne-form/personne-form.component';
import { SuppressionFormComponent } from './formulaires/suppression-form/suppression-form.component';
import { ListeComponent } from './liste/liste/liste.component';
import { ChartTextComponent } from './graphique/chart-text/chart-text.component';
import { GraphiqueComponent } from './graphique/graphique/graphique.component';
import { AccueilComponent } from './accueil.component';
import { InputListComponent } from './formulaires/personne-form/input-list/input-list.component';
import { EtapeTwoComponent } from './formulaires/personne-form/etape-two/etape-two.component';
import { EtapeThreeComponent } from './formulaires/personne-form/etape-three/etape-three.component';
import { EtapeSixComponent } from './formulaires/personne-form/etape-six/etape-six.component';
import { EtapeOneComponent } from './formulaires/personne-form/etape-one/etape-one.component';
import { EtapeFourComponent } from './formulaires/personne-form/etape-four/etape-four.component';
import { EtapeFiveComponent } from './formulaires/personne-form/etape-five/etape-five.component';



@NgModule({
  declarations: [
    ClanFormComponent,
    PersonneFormComponent,
    SuppressionFormComponent,
    ListeComponent,
    ChartTextComponent,
    GraphiqueComponent,
    AccueilComponent,
    InputListComponent,
    EtapeTwoComponent,
    EtapeThreeComponent,
    EtapeSixComponent,
    EtapeOneComponent,
    EtapeFourComponent,
    EtapeFiveComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccueilModule { }
