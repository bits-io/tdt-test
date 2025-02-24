import { IsNotEmpty } from "class-validator";

export default class ResetPasswordDTO {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;
}