import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminRouteGuard } from 'src/app/guards/admin-route.guard';
import { InstructorRouteGuard } from 'src/app/guards/instructor-route.guard';
import { StudentRouteGuard } from 'src/app/guards/student-route.guard';
import { Admin } from 'src/app/models/admin.model';
import { Instructor } from 'src/app/models/instructor.model';
import { Student } from 'src/app/models/student.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  user: User;
  admin: Admin;
  student: Student;
  instructor: Instructor;
  isClicked = false;
  isNotExisting = false;



  constructor(
    private loginService: LoginService,
    private studentGuard: StudentRouteGuard,
    private adminRouteGuard: AdminRouteGuard,
    private instructorRouteGuard: InstructorRouteGuard,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    this.signInForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    if(this.signInForm.value.email == null 
      || this.signInForm.value.password == null
      || !this.signInForm.get('email')?.valid 
      && this.signInForm.get('email')?.touched
      || !this.signInForm.get('password')?.valid 
      && this.signInForm.get('password')?.touched) return;

    
    this.loginService.getUser(this.signInForm).subscribe(
      data => {
        if (data.userType == 1) {
          this.isNotExisting = false;
          this.adminRouteGuard.userType = 1

          localStorage.setItem("userId", data.admin.id);
          localStorage.setItem("userType", data.userType);

          this.router.navigate(['admin/courses-list'])


        }
       else if (data.userType == 2) {
        this.isNotExisting = false;
          this.instructorRouteGuard.userType = 2
          localStorage.setItem("userId", data.instructor.id);
          localStorage.setItem("userType", data.userType);

          this.router.navigate(['instructor/instructor-course-list'])


        }

        else if (data.userType == 3) {
          this.isNotExisting = false;

          

          
          this.studentGuard.userType = 3;

          localStorage.setItem("userId", data.student.id);
          localStorage.setItem("userType", data.userType);

          


          this.router.navigate(['student/student-course-list'])



        } else{
          
          this.isNotExisting = true;
          
        }






      }
    )
  };


}


