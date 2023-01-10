import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: Date): String {
    let datePipe: DatePipe = new DatePipe("es-ES");

    try {
      let mes = datePipe.transform(value, 'MMMM','es-ES');
      let dia = datePipe.transform(value, 'dd','es-ES');

      return `${dia} de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`;
    } 
    catch (e) {
      return "Fecha invalida";
    } 
  }
}

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date): String {
    let datePipe: DatePipe = new DatePipe("es-ES");

    try {
      let mes = datePipe.transform(value, 'MMMM');
      let dia = datePipe.transform(value, 'dd');
      let anio = datePipe.transform(value, 'yyyy');
      let diaSemana = datePipe.transform(value, 'EEEE',);

      return `${diaSemana.charAt(0).toUpperCase()}${diaSemana.slice(1)} ${dia} de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}, ${anio}`;
    } 
    catch (e) {
      return "Fecha invalida";
    } 
  }
}
