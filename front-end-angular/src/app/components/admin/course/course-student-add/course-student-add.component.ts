import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  @Input() studentDialog: boolean;
  @Output() cancelStudent = new EventEmitter; 

  constructor(private courseService: AdminCourseService,
    private messageService: MessageService) { }

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




  addStudentToCourse(studentId?: number) {
    this.courseService.addStudentToCourse(studentId, this.courseId).subscribe(
      () => {
        this.getAllStudentsForACourse(this.courseId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student added to the Course', life: 3000 });

      }
    )

  }

  hideDialog(){
    this.cancelStudent.emit();
  }

}
