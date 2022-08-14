import { User } from "./user.model";

export class Admin implements User{
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;

    
    privilageLevel: number;

}