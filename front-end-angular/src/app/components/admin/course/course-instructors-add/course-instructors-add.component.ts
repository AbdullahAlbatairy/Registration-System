import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-course-instructors-add',
  templateUrl: './course-instructors-add.component.html',
  styleUrls: ['./course-instructors-add.component.css']
})
export class AdminCourseInstructorsAddComponent implements OnChanges {
  instructors: Instructor[];
  @Input() courseId?: number;
  

  constructor(private courseService: AdminCourseService) { }

  ngOnChanges(): void {
    this.getAllInstructorsForACourse(this.courseId);

  }

  getAllInstructorsForACourse(courseId?: number) {
    this.courseService.getAllInstructorForACourseAvailable(courseId).subscribe(
      instructors => {
        
        this.instructors = instructors;
      }
    )
  }

  addInstructorToCourse(instructorId?: number){
    this.courseService.addInstructorToCourse(instructorId, this.courseId).subscribe(
      () => {
        this.getAllInstructorsForACourse(this.courseId);
        
        
        
      }
    )
  }

}
