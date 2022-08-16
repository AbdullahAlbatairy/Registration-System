import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  services: MenuItem[];
  activeItem: MenuItem;


  constructor() { }

  ngOnInit(): void {
    this.services = [
      { label: "Courses", icon: 'pi pi-book', routerLink: "./courses-list",},
      { label: "Students", icon: 'pi pi-users', routerLink: "./students-list" },
      { label: "Instructors", icon: 'pi pi-users', routerLink: "./instructors-list" },

    ]

    this.activeItem = this.services[0];
  }




}
