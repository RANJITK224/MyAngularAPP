import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpModel } from '../empModel';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
/** edit component*/
export class EditComponent implements OnInit {
  id: number;
  empmodel: EmpModel;
  form: FormGroup;

  /** edit ctor */
  constructor(public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService.find(this.id).subscribe((data: EmpModel) => {
      this.empmodel = data;
    });
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.employeeService.update(this.id, this.form.value).subscribe(res => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('employee');
    })
  }
}

