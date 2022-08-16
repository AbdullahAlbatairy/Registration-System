import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-instructor-list',
  templateUrl: './course-instructor-list.component.html',
  styleUrls: ['./course-instructor-list.component.css']
})
export class AdminCourseInstructorListComponent implements OnChanges {

  @Input() courseId?: number;
  @Input() instructorDialog: boolean;
  instructors: Instructor[];
  constructor(private courseService: AdminCourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }


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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Delete Instructor',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.deleteInstructorFromCourse(instructorId, this.courseId).subscribe(
          () => {
            this.getAllInstructorForCourseRegistered();
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor deleted from Course', life: 3000 });
      }
    });

   

  }

}
