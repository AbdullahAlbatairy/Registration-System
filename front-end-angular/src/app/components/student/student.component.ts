import { Component, OnInit } from '@angular/core';
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


  constructor(private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
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
