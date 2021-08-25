import { Subscription } from 'rxjs';
import { TipRacunaService } from './../../../services/tip-racuna.service';
import { RacunService } from './../../../services/racun.service';
import { Racun } from './../../../models/racun';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TipRacuna } from 'src/app/models/tip-racuna';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit, OnDestroy {

  tipoviRacuna: TipRacuna[];
  public flag: number;
  tipRacunaSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
    this.tipRacunaSubscription = this.tipRacunaService.getAllTipoviRacuna()
      .subscribe(tipoviRacuna => {
        this.tipoviRacuna = tipoviRacuna;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  ngOnDestroy() {
    this.tipRacunaSubscription.unsubscribe();
  }

  compareTo(a, b) {
    return a.id === b.id;
  }

  public add(): void {
    this.racunService.addRacun(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodat račun!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška!', 'Zatvori', {
          duration: 1500
        })
      };
  }

  public update(): void {
    this.racunService.updateRacun(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovan račun!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška!', 'Zatvori', {
          duration: 1500
        })
      };
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Uspešno obrisan račun!', 'U redu', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška!', 'Zatvori', {
        duration: 1500
      })
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'Zatvori', {
      duration: 1500
    })
  }

}