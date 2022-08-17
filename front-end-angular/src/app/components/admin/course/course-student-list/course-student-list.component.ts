import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Student } from 'src/app/models/student.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-student-list',
  templateUrl: './course-student-list.component.html',
  styleUrls: ['./course-student-list.component.css']
})
export class AdminCourseStudentListComponent implements OnChanges {
  @Input() courseId?: number;
  @Input() studentDialog: boolean;
  @Output() cancelStudent = new EventEmitter;
  students: Student[];

  constructor(private courseService: AdminCourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Delete Instructor',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.deleteStudentFromCourse(studentId, this.courseId).subscribe(
          () => {
            this.getAllStudentsForCourseRegistered();
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student deleted from Course', life: 3000 });
      }
    });


  }

  hideDialog() {
    this.cancelStudent.emit();

  }
}
