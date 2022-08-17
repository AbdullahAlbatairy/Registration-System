import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { StudentCourseService } from 'src/app/services/student/course/course.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isAdding = false;
  courses: Course[];
  studentId: number;
  services: MenuItem[];
  activeItem: MenuItem;


  constructor(private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.services = [
      { label: "Courses", icon: 'pi pi-book', routerLink: "student-course-list",},

    ]

    this.activeItem = this.services[0];
  }

  updateCoursesRegistered(){
    this.studentId;
    
    this.studentCourseService.getAllCoursesForStudentRegistered(localStorage.getItem('userId') as string).subscribe(
      courses =>{
        this.courses = courses;
      }
    )

  }

}
