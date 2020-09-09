import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpModel } from '../empModel';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  empmodel: EmpModel = null;

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];

    this.employeeService.find(this.id).subscribe((data: EmpModel) => {
      if (data) {
        this.empmodel = data;
      }
    });
  }

}
