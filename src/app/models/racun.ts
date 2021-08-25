import { Klijent } from './klijent';
import { TipRacuna } from './tip-racuna';

export class Racun {
    id: number;
    naziv: string;
    opis: string;
    oznaka: string;
    klijent: Klijent;
    tipRacuna: TipRacuna;
}