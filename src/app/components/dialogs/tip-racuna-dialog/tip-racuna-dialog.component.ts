import { TipRacuna } from './../../../models/tip-racuna';
import { TipRacunaService } from './../../../services/tip-racuna.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
    public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.tipRacunaService.addTipRacuna(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspesno dodat tip racuna: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspesno modifikovan tip racuna: ' + this.data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public delete(): void {
    this.tipRacunaService.deleteTipRacuna(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspesno obrisan tip racuna', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {
      duration: 1000
    });
  }

}