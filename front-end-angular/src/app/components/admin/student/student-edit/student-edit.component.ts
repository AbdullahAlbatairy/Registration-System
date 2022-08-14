import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { AdminStudentService } from 'src/app/services/admin/student/student.service';

@Component({
  selector: 'app-admin-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class AdminStudentEditComponent implements OnInit {
  student: Student;
  @Input() studentId?: number;
  @Input() email: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() password: string;
  @Input() courses?: Course[];
  @Output() editedStudentInfo = new EventEmitter<Student>;
  editStudent: FormGroup;


  constructor(private studentService: AdminStudentService) { }

  ngOnInit(): void {
    this.editStudent = new FormGroup({
      "email": new FormControl(this.email, [Validators.required, Validators.email]),
      "firstName": new FormControl(this.firstName, Validators.required),
      "lastName": new FormControl(this.lastName, Validators.required),
      "password": new FormControl(this.password, Validators.required)

    })
  }

  onEditingStudent() {
    this.student = {
      id: this.studentId,
      email: this.editStudent.value.email,
      firstName: this.editStudent.value.firstName,
      lastName: this.editStudent.value.lastName,
      password: this.editStudent.value.password,
      courses: this.courses

    }

    this.studentService.editAStudent(this.student).subscribe(
      () => {
        this.editedStudentInfo.emit(this.student);
      }
    )
  }

}
