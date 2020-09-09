import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { EmpModel} from './empModel';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
/** employee component*/
export class EmployeeComponent implements OnInit  {
  public empdata: EmpModel[];
  /** employee ctor */
  constructor(public empService: EmployeeService) { }
  ngOnInit(): void {
    this.empService.getAll().subscribe((data: EmpModel[]) => {
      this.empdata = data;
      console.log(this.empdata);
    })
  }

  deleteEmp(id) {
    console.log(id);
    this.empService.delete(id).subscribe(res => {
      this.empdata = this.empdata.filter(item => item.employeeId !== id);
      console.log('Post deleted successfully!');
    })
  }
}

