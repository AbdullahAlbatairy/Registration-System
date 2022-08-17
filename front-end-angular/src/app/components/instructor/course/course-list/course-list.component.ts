import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { InstructorCourseService } from 'src/app/services/instructor/course/course.service';

@Component({
  selector: 'app-instructor-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class InstructorCourseListComponent implements OnInit {
  courses: Course[];
  students: Student[];
  studentDialog: boolean;
  isViewingStudents = false;

  constructor(private courseService: InstructorCourseService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {

    this.getAllCourseForInstructor();
  }

  getAllCourseForInstructor() {
    this.courseService.getAllCourseForInstructor(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }
    ); //Hard coded for now until
    // I implement Login

  }

  getAllStudentsForCourseForInstructor(courseId?: number) {
    this.studentDialog = true
    this.courseService.getAllStudentsForCourseForInstructor(courseId).subscribe(
      students => {
        this.students = students;
        this.isViewingStudents = true;

      }
    );

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

  onClose() {
    this.isViewingStudents = false;
  }
}
