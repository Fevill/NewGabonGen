import { Pipe, PipeTransform } from '@angular/core';
import { Personne } from '../entity/Personne';

@Pipe({
  name: 'sexefilter'
})
export class SexefilterPipe implements PipeTransform {

  transform(value: Personne[], sexe: string): Personne[] {
    return value.filter(p=>p.sexe==sexe);
  }

}
