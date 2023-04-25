import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {IUser} from "../interface/IUser";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../services/data.service";
import {map, merge, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'id', 'email', 'first_name', 'last_name'];
  data: IUser[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength = 0;
  isLoadingResults = true;
  pageSize = 0;

  constructor(private dataService: DataService) { }

  // Загрузка табличных данных с использованием серверной пагинации
  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.getUsers(
            this.paginator.pageIndex + 1,
          );
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }
          this.pageSize = data.per_page;
          this.resultsLength = data.total;
          return data.data;
        })
      )
      .subscribe(data => {
        this.data = data;
      });
  }

}
