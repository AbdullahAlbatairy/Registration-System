import { Course } from "./course.model";
import { User } from "./user.model";

export class Student implements User {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    courses?: Course[];
}