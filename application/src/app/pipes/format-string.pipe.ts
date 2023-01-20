import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ValueFromArray } from 'rxjs';

@Pipe({
  name: 'formatDateBirth'
})
export class FormatDateBirthPipe implements PipeTransform {

  transform(value: Date | string): String {
    let datePipe: DatePipe = new DatePipe("es-ES");

    try {
      let mes = datePipe.transform(value, 'MMMM','es-ES');
      let dia = datePipe.transform(value, 'dd','es-ES');
      let anio = datePipe.transform(value, 'yyyy');

      if (anio == '0001') {
        return '';
      }

      return `${dia} de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`;
    } 
    catch (e) {
      return '';
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

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(value: string): String {
    try {
      let duration = value.split(':');
      let hour = Number(duration[0]);
      let minute = Number(duration[1]);

      let min = minute > 0 ? `${minute} minutos` : '';

      if (hour > 1) {
        return `${hour} horas ${min}`;
      }
      else if (hour = 1) {
        return `${hour} hora ${min}`;
      }
      else {
        return `${min}`;
      }
    } 
    catch (e) {
      return value;
    } 
  }
}
