import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { StudentCourseService } from 'src/app/services/student/course/course.service';

@Component({
  selector: 'app-student-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class StudentCourseListComponent implements OnInit {
  @Input() courses: Course[];
  @Input() studentId: number;
  isAddingCourse: boolean;
  studentDialog: boolean;

  constructor(private studentCourseService: StudentCourseService,
    private confirmationService: ConfirmationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getAllCoursesForStudentRegistered();

  }


  getAllCoursesForStudentRegistered() {


    this.studentCourseService.getAllCoursesForStudentRegistered(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }

    )

  }

  logout() {

    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        this.router.navigate(['']);
      }
    });




  }

  onAddingCourse() {
    this.isAddingCourse = true;
    this.studentDialog = true;

  }

  onHidingDialog() {
    this.studentDialog = false;
    this.isAddingCourse = false;
  }

}
