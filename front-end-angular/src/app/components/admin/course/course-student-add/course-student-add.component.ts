import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-student-add',
  templateUrl: './course-student-add.component.html',
  styleUrls: ['./course-student-add.component.css']
})
export class AdminCourseStudentAddComponent implements OnChanges {
  students: Student[];
  @Input() courseId?: number;
  constructor(private courseService: AdminCourseService) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.getAllStudentsForACourse(this.courseId);
  }

  getAllStudentsForACourse(courseId?: number) {
    this.courseService.getAllStudentsForACourseAvailable(courseId).subscribe(
      students => {

        this.students = students;
      }
    )
  }




  addStudentToCourse(studentId?: number){
    this.courseService.addStudentToCourse(studentId, this.courseId).subscribe(
      () => {
        this.getAllStudentsForACourse(this.courseId);
      }
    )

  }

}
