import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Student } from 'src/app/models/student.model';
import { AdminStudentService } from 'src/app/services/admin/student/student.service';

@Component({
  selector: 'app-admin-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class AdminStudentEditComponent implements OnInit {
  @Input() student: Student;
  @Input() studentDialog: boolean;
  submitted: boolean;

  @Output() editedStudentInfo = new EventEmitter<Student>;
  editStudent: FormGroup;


  constructor(private studentService: AdminStudentService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.editStudent = new FormGroup({
      "email": new FormControl(this.student.email, [Validators.required, Validators.email]),
      "firstName": new FormControl(this.student.firstName, Validators.required),
      "lastName": new FormControl(this.student.lastName, Validators.required),

    })
  }

  onEditingStudent() {

    this.student.email = this.editStudent.value.email,
      this.student.firstName = this.editStudent.value.firstName,
      this.student.lastName = this.editStudent.value.lastName,

      this.studentService.editAStudent(this.student).subscribe(
        () => {
          this.editedStudentInfo.emit(this.student);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Has been Edited', life: 3000 });

        }
      )
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

}
