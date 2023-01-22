import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Utilities {

  stringCapitalize(input: string): string {
    const arr = input.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    
    return arr.join(" ");
  }
}