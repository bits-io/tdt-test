import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateArticleCommentDto {
    @IsOptional()
    userId: number;
        
    @IsOptional()
    articleId: number;
                
    @IsNotEmpty()
    comment: string;  
}
