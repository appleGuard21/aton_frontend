import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDataUser} from "../interface/IDataUser";
import {MatDialog} from "@angular/material/dialog";
import {UpdateDataComponent} from "../update-data/update-data.component";

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {

  @Input() dataUser: IDataUser;
  @Output() deleteEvent = new EventEmitter<number>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // Отправка id объекта в DataUsersComponent для последующего удаления из списка
  deleteData() {
    this.deleteEvent.emit(this.dataUser.id);
  }
  // Открытие модального окна для редактирования объекта. После успешной редакции компонент получает обновленный объект
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      data: this.dataUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataUser = result;
      }
    });
  }
}
