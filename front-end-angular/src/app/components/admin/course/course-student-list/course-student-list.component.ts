import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-student-list',
  templateUrl: './course-student-list.component.html',
  styleUrls: ['./course-student-list.component.css']
})
export class AdminCourseStudentListComponent implements OnChanges {
  @Input() courseId?: number;
  students: Student[];

  constructor(private courseService: AdminCourseService) { }

  ngOnChanges(): void {
    this.getAllStudentsForCourseRegistered();
  }

  getAllStudentsForCourseRegistered() {

    this.courseService.getAllStudentsForCourseRegistered(this.courseId).subscribe(
      students => {

        this.students = students;
      }
    )
  }

  deleteStudentFromCourse(studentId?: number) {
    this.courseService.deleteStudentFromCourse(studentId, this.courseId).subscribe(
      () => {
        this.getAllStudentsForCourseRegistered();
      }
    )

  }
}
