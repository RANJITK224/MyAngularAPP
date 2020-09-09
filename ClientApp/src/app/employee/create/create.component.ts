import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
/** Create component*/
export class CreateComponent implements OnInit {
    /** Create ctor */
  form: FormGroup;
  submitted = false;
  constructor(
    public empService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.empService.create(this.form.value).subscribe(res => {
        console.log('Post created successfully!');
        this.router.navigateByUrl('employee');
      })
    }
  }

  
}
