import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { StudentCourseService } from 'src/app/services/student/course/course.service';

@Component({
  selector: 'app-student-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class StudentCourseAddComponent implements OnInit {
  courses: Course[];
  studentId: number;
  @Output() addedCourse = new EventEmitter<Course>;
  constructor(private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.getAllCoursesForStudentAvailable();

  }


  getAllCoursesForStudentAvailable(){
    this.studentCourseService.getAllCoursesForStudentAvailable(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }

    )

  }

  addNewCourseToStudent(addedCourse: Course){
    this.studentCourseService.addCourseToStudent(localStorage.getItem('userId') as string, addedCourse).subscribe(
      ()=>{
        //update available courses for the student
        var foundIndex = this.courses.findIndex(course => course.id ==addedCourse.id)
        this.courses.splice(foundIndex, 1);

        //update register courses for the student
        this.addedCourse.emit();
      }
    );

  }

}
