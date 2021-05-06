import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { GraphiqueComponent } from './graphique/graphique/graphique.component';
import { ListeComponent } from './liste/liste/liste.component';
import { PersonneFormComponent } from './formulaires/personne-form/personne-form.component';
import { ClanFormComponent } from './formulaires/clan-form/clan-form.component';
import { SuppressionFormComponent } from './formulaires/suppression-form/suppression-form.component';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    children: [
      {
        path: 'graph',
        component: GraphiqueComponent
      },
      {
        path: 'pers',
        component: ListeComponent,
        data:{
          path:'pers',
          header:[
            {name: 'id',display:'Id'},
            {name: 'oBnom',display:'Les noms'}, 
            {name: 'prenoms',display:'Les prénoms'},
            {name: 'sexe',display:'Le sexe'},
            {name: 'oBpronom',display:'La prononciation'}, 
            {name: 'Commentaire',display:'Commentaires'},
          ]

        }
      },
      {
        path: 'clan',
        component: ListeComponent,
        data:{
          path:'clan',
          header:[
            {name: 'id',display:'Id'},
            {name: 'nom',display:'Nom du clan'}, 
            {name: 'description',display:'Dèscription du clan'},
          ]
        }
      },
      {
        path: 'pers-form',
        component: PersonneFormComponent
      },
      {
        path: 'clan-form',
        component: ClanFormComponent
      },
      {
        path: 'del-form',
        component: SuppressionFormComponent
      },
    ]
  },
  
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule {}
