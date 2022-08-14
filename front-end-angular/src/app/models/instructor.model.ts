import { Course } from "./course.model";
import { User } from "./user.model";

export class Instructor implements User {
    email: string;
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    courses?: Course[];


}