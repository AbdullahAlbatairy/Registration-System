import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class AdminCourseEditComponent implements OnInit {
  @Input() course: Course;
  submitted: boolean;
  @Input() courseId: number;
  @Input() courseName: string;
  @Input() courseDesc: string;
  @Input() courseDialog: boolean;
  @Output() editedCourse = new EventEmitter<Course>;
  editCourse: FormGroup;
  constructor(private courseService: AdminCourseService, private messageService: MessageService) { }

  ngOnInit(): void {
    

    this.editCourse = new FormGroup({
      "courseName": new FormControl(this.course.courseName, Validators.required),
      "courseDesc": new FormControl(this.course.courseDesc, Validators.required)
    })

  }

  onEditingCourse() {

    
    this.course.courseName = this.editCourse.value.courseName
    this.course.courseDesc = this.editCourse.value.courseDesc 

    

    this.courseService.editACourse(this.course).subscribe(
      () => {
        this.editedCourse.emit(this.course);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Course Has been Edited', life: 3000});

      }
    );



  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }
}
