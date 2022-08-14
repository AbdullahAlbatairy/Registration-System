import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private studentCourseService: StudentCourseService) { 

  }

  ngOnInit(): void {
    this.getAllCoursesForStudentRegistered();

  }


  getAllCoursesForStudentRegistered(){
    
    
    this.studentCourseService.getAllCoursesForStudentRegistered(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }

    )

  }

}
