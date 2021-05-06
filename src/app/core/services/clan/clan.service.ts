import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Clan } from '../../../entity/Clan';
import { ElectronService } from 'ngx-electron';


@Injectable({
  providedIn: 'root'
})
export class ClanService {

 
  constructor(private _electronService: ElectronService) { }

  getClans(): Observable<Clan[]> {
    console.log('getAllClans')
    return of(
      this._electronService.ipcRenderer.sendSync('getClans')
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  addClan(item: Clan): Observable<Clan[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('addClan', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  deleteClan(item: Clan): Observable<Clan[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('deleteClan', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  updateClan(item: Clan): Observable<Clan[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('updateClan', item)
    ).pipe(catchError((error: any) => Observable.throw(error.json)));
  }
}

