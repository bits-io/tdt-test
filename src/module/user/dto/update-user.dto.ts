import { IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    username: string;

    @IsOptional()
    email: string;

    @IsOptional()
    phone: string;
}
