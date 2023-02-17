import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Shared/api.service';
import { EmployeeModal } from './employee.modal';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-my-compo',
  templateUrl: './my-compo.component.html',
  styleUrls: ['./compo.component.css'],
})
export class MyCompoComponent {
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  employeeObj: EmployeeModal = new EmployeeModal();
  employeeData!: any;

  constructor(private bodybuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.bodybuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
    });

    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeObj.fname = this.formValue.value.fname;
    this.employeeObj.lname = this.formValue.value.lname;
    this.employeeObj.email = this.formValue.value.email;

    this.api.postEmployee(this.employeeObj).subscribe({
      complete: () => {
        alert('Employee Added Successfully!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployee();
      }, // completeHandler
      error: () => {
        alert('Something Went Wrong!');
        let ref = document.getElementById('cancel');
        ref?.click();
      }, // errorHandler
    });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployeeDetail(row: EmployeeModal) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee Deleted Successfully !');
      this.getAllEmployee();
    });
  }

  onEdit(row: EmployeeModal) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeObj.id = row.id;
    this.formValue.controls['fname'].setValue(row.fname);
    this.formValue.controls['lname'].setValue(row.lname);
    this.formValue.controls['email'].setValue(row.email);
  }

  updateEmployeeDetails() {
    this.employeeObj.fname = this.formValue.value.fname;
    this.employeeObj.lname = this.formValue.value.lname;
    this.employeeObj.email = this.formValue.value.email;

    this.api
      .updateEmployee(this.employeeObj, this.employeeObj.id)
      .subscribe((res) => {
        alert('Updated Successfully!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
