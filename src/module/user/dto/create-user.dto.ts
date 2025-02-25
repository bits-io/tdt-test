import { IsIn, IsNotEmpty, Validate } from "class-validator";
import { IsUnique } from "src/helpers/decorator.helper";
import Role from "../enum/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @Validate(IsUnique, ['user', 'username'])
    username: string;

    @IsNotEmpty()    
    @Validate(IsUnique, ['user', 'email'])
    email: string;

    @IsNotEmpty()
    @Validate(IsUnique, ['user', 'phone'])
    phone: string;

    @IsNotEmpty()
    password: string;  
    
    @IsNotEmpty()
    @IsIn(Object.values(Role))
    role: string;
}
