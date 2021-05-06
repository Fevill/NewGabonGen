import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Personne } from '../../../entity/Personne';
import { ElectronService } from 'ngx-electron';
import { Details } from 'electron/main';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private _electronService: ElectronService) { }

  _personnes = [
    {
      idPersonne: 1,
      noms: 'Personne 1',
      prenoms: 'prenoms',
      prononciation: 'pro 1',
      sexe: 'sexe 1',
      autreDetails: 'autre 1',
      commentaires: 'Description Personne 1',
      idPere: 0,
      idClan: 0
    },
    {
      idPersonne: 2,
      noms: 'Personne 2',
      prenoms: 'prenoms',
      prononciation: 'pro 2',
      sexe: 'sexe 2',
      autreDetails: 'autre 2',
      commentaires: 'Description Personne 2',
      idPere: 0,
      idClan: 0
    },
    {
      idPersonne: 3,
      noms: 'Personne 3',
      prenoms: 'prenoms',
      prononciation: 'pro 3',
      sexe: 'sexe 3',
      autreDetails: 'autre 3',
      commentaires: 'Description Personne 3',
      idPere: 0,
      idClan: 0
    }
    , {
      idPersonne: 4,
      noms: 'Personne 4',
      prenoms: 'prenoms',
      prononciation: 'pro 4',
      sexe: 'sexe 4',
      autreDetails: 'autre 4',
      commentaires: 'Description Personne 4',
      idPere: 0,
      idClan: 0
    }
    , {
      idPersonne: 5,
      noms: 'Personne 5',
      prenoms: 'prenoms',
      prononciation: 'pro 5',
      sexe: 'sexe 5',
      autreDetails: 'autre 5',
      commentaires: 'Description Personne 5',
      idPere: 0,
      idClan: 0
    }, {
      idPersonne: 6,
      noms: 'Personne 6',
      prenoms: 'prenoms',
      prononciation: 'pro 6',
      sexe: 'sexe 4',
      autreDetails: 'autre 6',
      commentaires: 'Description Personne 6',
      idPere: 0,
      idClan: 0
    }
  ]

  getPersonnes(): Observable<Personne[]> {
    console.log('getAllPersonnes')
    return of(
      this._electronService.ipcRenderer.sendSync('getPersonnes')
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  getPersonneDetail(): Observable<Details[]> {
    console.log('getPersonneDetail')
    return of(
      this._electronService.ipcRenderer.sendSync('getPersonneDetail')
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  addPersonne(item: Personne): Observable<Personne[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('addPersonne', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }
  addPersonne2(item: Personne) {
    this._electronService.ipcRenderer.send('addPersonne', item)
  }

  deletePersonne(item: Personne): Observable<Personne[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('deletePersonne', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  updatePersonne(item: Personne): Observable<Personne[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('updatePersonne', item)
    )
  }
}
