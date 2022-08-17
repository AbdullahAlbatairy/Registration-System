import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-course-instructors-add',
  templateUrl: './course-instructors-add.component.html',
  styleUrls: ['./course-instructors-add.component.css']
})
export class AdminCourseInstructorsAddComponent implements OnChanges, OnInit {
  instructors: Instructor[];
  @Input() instructorDialog: boolean;
  @Input() courseId?: number;
  @Output() cancelInstructor = new EventEmitter;




  constructor(private courseService: AdminCourseService,
    private messageService: MessageService) { }
  ngOnInit(): void {


  }

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

  addInstructorToCourse(instructorId?: number) {
    this.courseService.addInstructorToCourse(instructorId, this.courseId).subscribe(
      () => {
        this.getAllInstructorsForACourse(this.courseId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Has been added to the course', life: 3000 });





      }
    )
  }

  hideDialog() {
    this.instructorDialog = false;
    this.cancelInstructor.emit()


  }

}
