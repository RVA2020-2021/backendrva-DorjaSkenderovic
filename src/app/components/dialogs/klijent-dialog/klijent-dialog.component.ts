import { Subscription } from 'rxjs';
import { KreditService } from './../../../services/kredit.service';
import { KlijentService } from './../../../services/klijent.service';
import { Klijent } from './../../../models/klijent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Kredit } from 'src/app/models/kredit';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit, OnDestroy {

  krediti: Kredit[];
  public flag: number;
  kreditSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KlijentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Klijent,
              public klijentService: KlijentService,
              public kreditService: KreditService) { }

  ngOnInit(): void {
    this.kreditSubscription = this.kreditService.getAllKrediti()
      .subscribe(krediti => {
        this.krediti = krediti
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  ngOnDestroy(): void {
    this.kreditSubscription.unsubscribe();
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.klijentService.addKlijent(this.data)
      .subscribe(()=> {
        this.snackBar.open('Uspešno dodat klijent', "U redu", {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
        });
      };
  }

  public update(): void {
    this.klijentService.updateKlijent(this.data)
    .subscribe(()=> {
      this.snackBar.open('Uspešno modifikovan klijent: ' + this.data.id, "U redu", {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + '-->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
      });
    };
  }

  public delete(): void {
    this.klijentService.deleteKlijent(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisan klijent: ' + this.data.id, "U redu", {
          duration: 2500
        })
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
    this.snackBar.open('Odustali ste!', 'Zatvori', {
      duration: 1500
    });
  }

}