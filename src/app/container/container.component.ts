import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterContentInit {

  // to allow changes of content from another component
  @ContentChild(EmployeeComponent) empContent !: EmployeeComponent;
  constructor() { }

  ngOnInit(): void {
  }


  ngAfterContentInit(): void {

    this.empContent.empName = "yahya ibn marwaan"
  }
}

