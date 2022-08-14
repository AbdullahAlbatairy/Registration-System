import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-instructor-list',
  templateUrl: './course-instructor-list.component.html',
  styleUrls: ['./course-instructor-list.component.css']
})
export class AdminCourseInstructorListComponent implements OnChanges {

  @Input() courseId?: number;
  instructors: Instructor[];
  constructor(private courseService: AdminCourseService) { }


  ngOnChanges(): void {
    this.getAllInstructorForCourseRegistered();
  }




  getAllInstructorForCourseRegistered() {

    this.courseService.getAllInstructorForACourseRegistered(this.courseId).subscribe(
      instructors => {

        this.instructors = instructors;
      }
    )
  }

  deleteInstructorFromCourse(instructorId?: number) {
    this.courseService.deleteInstructorFromCourse(instructorId, this.courseId).subscribe(
      () => {
        this.getAllInstructorForCourseRegistered();
      }
    )

  }

}
