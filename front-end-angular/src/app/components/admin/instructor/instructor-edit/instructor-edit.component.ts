import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class AdminInstructorEditComponent implements OnInit {
  instructor: Instructor;
  @Input() instructorId?: number;
  @Input() email: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() password: string;
  @Input() courses?: Course[];
  @Output() editedStudentInfo = new EventEmitter<Instructor>;
  editInstructor: FormGroup;
  constructor(private instructorService: AdminInstructorService) {

   }

  ngOnInit(): void {
    this.editInstructor = new FormGroup({
      "email": new FormControl(this.email, [Validators.required, Validators.email]),
      "firstName": new FormControl(this.firstName, Validators.required),
      "lastName": new FormControl(this.lastName, Validators.required),
      "password": new FormControl(this.password, Validators.required)

    })
  }

  onEditingInstructor() {
    this.instructor = {
      id: this.instructorId,
      email: this.editInstructor.value.email,
      firstName: this.editInstructor.value.firstName,
      lastName: this.editInstructor.value.lastName,
      password: this.editInstructor.value.password,
      courses: this.courses

    }

    this.instructorService.editAnInstructor(this.instructor).subscribe(
      () => {
        this.editedStudentInfo.emit(this.instructor);
      }
    )
  }

}
