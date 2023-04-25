import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDataUser} from "../interface/IDataUser";
import {FormBuilder, Validators} from "@angular/forms";
import {IDataUserRequest} from "../interface/IDataUserRequest";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {

  updateDataForm = this.fb.group({
    name: ['', [Validators.required]],
    job: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDataUser,
              private fb: FormBuilder,
              private dataService: DataService,
              private dialogRef: MatDialogRef<UpdateDataComponent>) { }

  ngOnInit(): void {
    this.updateDataForm.controls.name.setValue(this.data.name);
    this.updateDataForm.controls.job.setValue(this.data.job);
  }
  // Отправка данных на сервер, если форма валидна,
  // последующее закрытие модального окна и отправкой данных компонента окна в вызвавший его компонент
  onSubmit() {
    if(this.updateDataForm.valid){
      const request: IDataUserRequest = this.updateDataForm.value as unknown as IDataUserRequest;
      this.dataService.updateData(this.data.id, request).subscribe(dataUser=>{
        const newDataUser: IDataUser = {
          createdAt: this.data.createdAt,
          updatedAt: dataUser.updatedAt,
          id: this.data.id,
          job: dataUser.job,
          name: dataUser.name
        };
        this.dialogRef.close(newDataUser);
      });
    }
  }
  // Создание текста ошибок валидатора поля "name"
  getNameErrorMessage() {
    if (this.updateDataForm.controls.name.hasError('required')) {
      return 'The field must not be empty';
    }
    return '';
  }
  // Создание текста ошибок валидатора поля "job"
  getJobErrorMessage() {
    if (this.updateDataForm.controls.job.hasError('required')) {
      return 'The field must not be empty';
    }
    return '';
  }

}
