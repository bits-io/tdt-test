import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { ArticleModule } from 'src/module/article/article.module';
import { ArticleCategoryModule } from 'src/module/article-category/article-category.module';
import { ArticleCommentModule } from 'src/module/article-comment/article-comment.module';

@Module({
  imports: [
    ArticleModule,
    ArticleCategoryModule,
    ArticleCommentModule,
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
