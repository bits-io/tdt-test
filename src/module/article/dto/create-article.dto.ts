import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;        
        
    @IsOptional()
    content: string;    
    
    @IsOptional()
    userId: number;
    
    @IsOptional()
    categoryId: number;
}
