import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {IDataUserRequest} from "../interface/IDataUserRequest";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  addDataForm = this.fb.group({
    name: ['', [Validators.required]],
    job: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private dialogRef: MatDialogRef<AddDataComponent>) { }

  ngOnInit(): void {
  }
  // Создание текста ошибок валидатора поля "name"
  getNameErrorMessage() {
    if (this.addDataForm.controls.name.hasError('required')) {
      return 'The field must not be empty';
    }
    return '';
  }
  // Создание текста ошибок валидатора поля "job"
  getJobErrorMessage() {
    if (this.addDataForm.controls.job.hasError('required')) {
      return 'The field must not be empty';
    }
    return '';
  }
  // Отправка данных на сервер, если форма валидна,
  // последующее закрытие модального окна и отправкой данных компонента окна в вызвавший его компонент.
  onSubmit() {
    if(this.addDataForm.valid){
      const request: IDataUserRequest = this.addDataForm.value as unknown as IDataUserRequest;
      this.dataService.addData(request).subscribe(dataUser=>{
        this.dialogRef.close(dataUser);
      });
    }
  }
}
