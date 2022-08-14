import { Component, OnInit } from '@angular/core';
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
  isViewingStudents = false;

  constructor(private courseService: InstructorCourseService) { }

  ngOnInit(): void {

    this.getAllCourseForInstructor();
  }

  getAllCourseForInstructor(){
    this.courseService.getAllCourseForInstructor(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }
    ); //Hard coded for now until
    // I implement Login

  }

  getAllStudentsForCourseForInstructor(courseId?: number){
    this.courseService.getAllStudentsForCourseForInstructor(courseId).subscribe(
      students =>{
        this.students = students;
        this.isViewingStudents = true;

      }
    ); 

  }

}
