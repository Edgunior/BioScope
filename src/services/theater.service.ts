import { Injectable } from '@angular/core';
import { TheaterModel } from "../models/theater.model";

@Injectable({
  providedIn: 'root' 
})
export class TheaterService {
    getTheaters(): TheaterModel[] {
        return [
            { id: 1, name: 'BioScope Beograd', location: 'Beograd' },
            { id: 2, name: 'BioScope Kragujevac', location: 'Kragujevac' },
            { id: 3, name: 'BioScope Novi Sad', location: 'Novi Sad' },
            { id: 4, name: 'BioScope Niš', location: 'Niš' },
        ];
    }

    getTheaterById(id: number): TheaterModel | undefined {
        return this.getTheaters().find(theater => theater.id === id);
    }
}
