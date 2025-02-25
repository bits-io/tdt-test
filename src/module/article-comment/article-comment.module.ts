import { Module } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { ArticleCommentController } from './article-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleComment } from './entities/article-comment.entity';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleComment]),
    ArticleModule,
  ],
  controllers: [ArticleCommentController],
  providers: [ArticleCommentService],
  exports: [ArticleCommentService]
})
export class ArticleCommentModule {}
