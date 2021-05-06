import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanFormComponent } from './formulaires/clan-form/clan-form.component';
import { PersonneFormComponent } from './formulaires/personne-form/personne-form.component';
import { SuppressionFormComponent } from './formulaires/suppression-form/suppression-form.component';
import { ListeComponent } from './liste/liste/liste.component';
import { ChartTextComponent } from './graphique/chart-text/chart-text.component';
import { GraphiqueComponent } from './graphique/graphique/graphique.component';
import { AccueilComponent } from './accueil.component';



@NgModule({
  declarations: [
    ClanFormComponent,
    PersonneFormComponent,
    SuppressionFormComponent,
    ListeComponent,
    ChartTextComponent,
    GraphiqueComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccueilModule { }
