import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentComponent } from './components/admin/student/student.component';
import { AdminStudentListComponent } from './components/admin/student/student-list/student-list.component';
import { NavbarComponent } from './general-components/navbar/navbar.component';
import { AdminStudentService } from './services/admin/student/student.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminService } from './services/admin/admin.service';
import { AdminInstructorListComponent } from './components/admin/instructor/instructor-list/instructor-list.component';
import { AdminInstructorService } from './services/admin/instructor/instructor.service';
import { AdminCourseComponent } from './components/admin/course/course.component';
import { AdminCourseListComponent } from './components/admin/course/course-list/course-list.component';
import { AdminInstructorComponent } from './components/admin/instructor/instructor.component';
import { AdminCourseService } from './services/admin/course/course.service';
import { AdminCourseAddComponent } from './components/admin/course/course-add/course-add.component';
import { AdminCourseEditComponent } from './components/admin/course/course-edit/course-edit.component';
import { AdminStudentAddComponent } from './components/admin/student/student-add/student-add.component';
import { AdminStudentEditComponent } from './components/admin/student/student-edit/student-edit.component';
import { AdminInstructorAddComponent } from './components/admin/instructor/instructor-add/instructor-add.component';
import { AdminInstructorEditComponent } from './components/admin/instructor/instructor-edit/instructor-edit.component';
import { AdminCourseInstructorsAddComponent } from './components/admin/course/course-instructors-add/course-instructors-add.component';
import { AdminCourseInstructorListComponent } from './components/admin/course/course-instructor-list/course-instructor-list.component';
import { AdminCourseStudentAddComponent } from './components/admin/course/course-student-add/course-student-add.component';
import { AdminCourseStudentListComponent } from './components/admin/course/course-student-list/course-student-list.component';
import { InstructorCourseListComponent } from './components/instructor/course/course-list/course-list.component';
import { InstructorStudentListComponent } from './components/instructor/student/student-list/student-list.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { StudentCourseListComponent } from './components/student/course/course-list/course-list.component';
import { StudentComponent } from './components/student/student.component';
import { StudentCourseAddComponent } from './components/student/course/course-add/course-add.component';
import { LoginComponent } from './general-components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AdminRouteGuard } from './guards/admin-route.guard';
import { StudentRouteGuard } from './guards/student-route.guard';
import { InstructorRouteGuard } from './guards/instructor-route.guard';
import { PathLocationStrategy } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabMenuModule } from 'primeng/tabmenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'students-list', component: AdminStudentListComponent },
      { path: 'instructors-list', component: AdminInstructorListComponent },
      { path: 'courses-list', component: AdminCourseListComponent },
    ], canActivate: [AdminRouteGuard]
  },

  {
    path: 'instructor', component: InstructorComponent, children: [
      { path: 'instructor-course-list', component: InstructorCourseListComponent },
      { path: 'instructor-student-list', component: InstructorStudentListComponent },
    ], canActivate: [InstructorRouteGuard]
  },

  {
    path: 'student', component: StudentComponent, children: [
      { path: 'student-course-list', component: StudentCourseListComponent }
    ],

    canActivate: [StudentRouteGuard]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminStudentComponent,
    AdminStudentListComponent,
    AdminInstructorComponent,
    AdminInstructorListComponent,
    AdminComponent,
    AdminCourseComponent,
    AdminCourseListComponent,
    AdminCourseAddComponent,
    AdminCourseEditComponent,
    AdminStudentAddComponent,
    AdminStudentEditComponent,
    AdminInstructorComponent,
    AdminInstructorAddComponent,
    AdminInstructorEditComponent,
    AdminCourseInstructorsAddComponent,
    AdminCourseInstructorListComponent,
    AdminCourseStudentAddComponent,
    AdminCourseStudentListComponent,
    InstructorCourseListComponent,
    InstructorStudentListComponent,
    InstructorComponent,
    StudentCourseListComponent,
    StudentComponent,
    StudentCourseAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    TabMenuModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    RouterModule.forRoot(routes)

  ],
  providers: [AdminStudentService,
    AdminService,
    AdminInstructorService,
    AdminCourseService,
    AuthService,
    MessageService,
    ConfirmationService,
    AdminRouteGuard,
    StudentRouteGuard,
    InstructorRouteGuard,
    PathLocationStrategy],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
