import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class UtilsService {
      
        constructor() { }
        
        formatDate(iso: string) {
            return new Date(iso).toLocaleDateString('sr-RS');
        }

}