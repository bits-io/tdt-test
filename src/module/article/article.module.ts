import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleCategoryModule } from '../article-category/article-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    ArticleCategoryModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
