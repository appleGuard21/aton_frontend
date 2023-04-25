import { Component, OnInit } from '@angular/core';
import {IDataUser} from "../interface/IDataUser";
import {DataService} from "../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {AddDataComponent} from "../add-data/add-data.component";

@Component({
  selector: 'app-data-users',
  templateUrl: './data-users.component.html',
  styleUrls: ['./data-users.component.css']
})
export class DataUsersComponent implements OnInit {

  dataUsers: IDataUser[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // Получение id объкта из DataUserComponent. Отправка delete запроса на сервер
  deleteDataUser(id: number) {
    this.dataService.deleteData(id).subscribe(()=>{
      this.dataUsers = this.dataUsers.filter(d => d.id != id);
    });
  }
  // Открытие модального окна для добавления нового объекта,
  // получение объкта из компонента окна и добавлениие его в конец списка
  openDialog(): void {
    const dialogRef = this.dialog.open(AddDataComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataUsers = [...this.dataUsers, result];
      }
    });
  }
}
