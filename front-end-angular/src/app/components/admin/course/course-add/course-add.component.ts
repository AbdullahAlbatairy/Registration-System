import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class AdminCourseAddComponent implements OnInit {
  @Input() courseDialog: boolean;
  submitted: boolean;
  addCourse: FormGroup;
  @Input() course: Course; 
  isClicked = false;
  @Output() newCourse = new EventEmitter<Course>;

  
  constructor(private courseService: AdminCourseService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.addCourse = new FormGroup({
      "courseName": new FormControl(null, Validators.required),
      "courseDesc": new FormControl(null, Validators.required)
    })

  }

  onAddingCourse() {
    if(this.addCourse.value.courseName == null 
      || this.addCourse.value.courseDesc == null
      
      || !this.addCourse.get('courseName')?.valid 
      && this.addCourse.get('courseName')?.touched
      || !this.addCourse.get('courseDesc')?.valid 
      && this.addCourse.get('courseDesc')?.touched
    ) return;

    this.course = {
      courseName: this.addCourse.value.courseName,
      courseDesc: this.addCourse.value.courseDesc
    };

    this.courseService.addACourse(this.course).subscribe(
      ()=> {
          this.newCourse.emit(this.course);
          this.courseDialog = false;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'New Course Has been added', life: 3000});

      }
    );

  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

}
