import { Subscription } from 'rxjs';
import { KlijentDialogComponent } from './../dialogs/klijent-dialog/klijent-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Kredit } from './../../models/kredit';
import { KlijentService } from './../../services/klijent.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Klijent } from 'src/app/models/klijent';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  selektovanKlijent: Klijent;
  klijentSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public klijentService: KlijentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.klijentSubscription.unsubscribe();
  }

  public loadData() {
    this.klijentSubscription = this.klijentService.getAllKlijenti()
      .subscribe((data) => {

        this.dataSource = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'kredit': return data.kredit.naziv.toLocaleLowerCase();
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

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, kredit?: Kredit) {
    const dialogRef = this.dialog.open(KlijentDialogComponent,
      {data: {id, ime, prezime, brojLk, kredit}});
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  }

  selectRow(row: any) {
    // console.log(row);
    this.selektovanKlijent = row;
    // console.log(this.selektovanKlijent;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}