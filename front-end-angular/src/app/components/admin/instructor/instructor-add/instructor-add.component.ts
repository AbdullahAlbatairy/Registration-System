import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.css']
})
export class AdminInstructorAddComponent implements OnInit {
  addInstructor: FormGroup;
  instructor: Instructor;
  isClicked = false;
  @Output() newInstructor = new EventEmitter<Instructor>;

  constructor(private instructorService: AdminInstructorService) { }

  ngOnInit(): void {
    this.addInstructor = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
    })
  }


  onAddingInstructor() {
    if(this.addInstructor.value.email == null 
      || this.addInstructor.value.firstName == null
      || this.addInstructor.value.lastName == null
      || this.addInstructor.value.password == null
      || !this.addInstructor.get('email')?.valid 
      && this.addInstructor.get('email')?.touched
      || !this.addInstructor.get('firstName')?.valid 
      && this.addInstructor.get('firstName')?.touched
      || !this.addInstructor.get('lastName')?.valid 
      && this.addInstructor.get('lastName')?.touched
      || !this.addInstructor.get('password')?.valid 
      && this.addInstructor.get('password')?.touched) return;

    this.instructor = {
      email: this.addInstructor.value.email,
      firstName: this.addInstructor.value.firstName,
      lastName: this.addInstructor.value.lastName,
      password: this.addInstructor.value.password,
    };

    this.instructorService.addAnInstructor(this.instructor).subscribe(
      () => {
        this.newInstructor.emit(this.instructor);
      }
    );

  }

}
