import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { StudentCourseService } from 'src/app/services/student/course/course.service';

@Component({
  selector: 'app-student-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class StudentCourseAddComponent implements OnInit {
  courses: Course[];
  studentId: number;
  @Input() studentDialog: boolean
  @Output() addedCourse = new EventEmitter<Course>;
  @Output() courseDialogHide = new EventEmitter;
  constructor(private studentCourseService: StudentCourseService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllCoursesForStudentAvailable();

  }


  getAllCoursesForStudentAvailable() {
    this.studentCourseService.getAllCoursesForStudentAvailable(localStorage.getItem('userId') as string).subscribe(
      courses => {
        this.courses = courses;
      }

    )

  }

  addNewCourseToStudent(addedCourse: Course) {
    this.studentCourseService.addCourseToStudent(localStorage.getItem('userId') as string, addedCourse).subscribe(
      () => {
        var foundIndex = this.courses.findIndex(course => course.id == addedCourse.id)
        this.courses.splice(foundIndex, 1);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Course Has been added', life: 3000 });

        this.addedCourse.emit();
      }
    );

  }

  hideDialog() {
    this.courseDialogHide.emit();

  }

}
