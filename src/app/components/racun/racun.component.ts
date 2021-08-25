import { Subscription } from 'rxjs';
import { RacunDialogComponent } from './../dialogs/racun-dialog/racun-dialog.component';
import { TipRacuna } from './../../models/tip-racuna';
import { MatDialog } from '@angular/material/dialog';
import { RacunService } from './../../services/racun.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnChanges, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Racun } from 'src/app/models/racun';
import { Klijent } from 'src/app/models/klijent';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})

export class RacunComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis' , 'klijent', 'tipRacuna', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() selektovanKlijent: Klijent;

  constructor(private racunService: RacunService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovanKlijent.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.subscription = this.racunService.getRacunKlijent(this.selektovanKlijent.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),

      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis? :string, klijent?: Klijent, tipRacuna?: TipRacuna) {
    const dialogRef = this.dialog.open(RacunDialogComponent, { data: {id, naziv, oznaka, opis , tipRacuna, klijent} });
    dialogRef.componentInstance.flag = flag;
    if(flag===1) {
      dialogRef.componentInstance.data.klijent = this.selektovanKlijent;
    }
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}