import { IsNotEmpty } from "class-validator";

export class CreateArticleCategoryDto {
    @IsNotEmpty()
    name: string; 
}
