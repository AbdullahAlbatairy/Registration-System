import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class AdminCourseEditComponent implements OnInit {
  course: Course;
  @Input() courseId: number;
  @Input() courseName: string;
  @Input() courseDesc: string;
  @Output() editedCourse = new EventEmitter<Course>;
  editCourse: FormGroup;
  constructor(private courseService: AdminCourseService) { }

  ngOnInit(): void {

    this.editCourse = new FormGroup({
      "courseName": new FormControl(this.courseName, Validators.required),
      "courseDesc": new FormControl(this.courseDesc, Validators.required)
    })

  }

  onEditingCourse() {
    this.course = {
      id: this.courseId,
      courseName: this.editCourse.value.courseName,
      courseDesc: this.editCourse.value.courseDesc
    }

    this.courseService.editACourse(this.course).subscribe(
      () => {
        this.editedCourse.emit(this.course);
      }
    );



  }

}
