import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  services: MenuItem[];
  activeItem: MenuItem;
  viewingCourses = false;
  constructor() { }

  ngOnInit(): void {
    this.services = [
      { label: "Courses", icon: 'pi pi-book', routerLink: "instructor-course-list",},

    ]

    this.activeItem = this.services[0];
  }

}
