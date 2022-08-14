import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { AdminStudentService } from 'src/app/services/admin/student/student.service';

@Component({
  selector: 'app-admin-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class AdminStudentAddComponent implements OnInit {
  addStudent: FormGroup;
  student: Student;
  @Output() newStudent = new EventEmitter<Student>;
  isClicked = false;
  constructor(private studentService: AdminStudentService) { }

  ngOnInit(): void {
    this.addStudent = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
    })
  }

  onAddingStudent() {
    if(this.addStudent.value.email == null 
      || this.addStudent.value.firstName == null
      || this.addStudent.value.lastName == null
      || this.addStudent.value.password == null
      || !this.addStudent.get('email')?.valid 
      && this.addStudent.get('email')?.touched
      || !this.addStudent.get('firstName')?.valid 
      && this.addStudent.get('firstName')?.touched
      || !this.addStudent.get('lastName')?.valid 
      && this.addStudent.get('lastName')?.touched
      || !this.addStudent.get('password')?.valid 
      && this.addStudent.get('password')?.touched) return;

    this.student = {
      email: this.addStudent.value.email,
      firstName: this.addStudent.value.firstName,
      lastName: this.addStudent.value.lastName,
      password: this.addStudent.value.password,
    };

    this.studentService.addAStudent(this.student).subscribe(
      (data) => {
        this.newStudent.emit(this.student);

        console.log(data);
        
      }
    );

  }

}
