import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { ArticleService } from 'src/module/article/article.service';
import { Article } from 'src/module/article/entities/article.entity';
import { ArticleComment } from 'src/module/article-comment/entities/article-comment.entity';
import { ArticleCommentService } from 'src/module/article-comment/article-comment.service';
import { ArticleCategoryService } from 'src/module/article-category/article-category.service';
import { ArticleCategory } from 'src/module/article-category/entities/article-category.entity';

@Controller('public')
export class PublicController {
  constructor(
    private readonly publicService: PublicService,
    private readonly articleService: ArticleService,
    private readonly articleCommentService: ArticleCommentService,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Get('/article')
  async findAllArticle(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: keyof Article,
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'DESC',
    @Query() q: any,
  ) {
    const order = orderBy ? { [orderBy]: orderType } : { id: 'DESC' as 'ASC' | 'DESC' };
    const article = await this.articleService.findAll(page, pageSize, q.search, {
      categoryId: q.categoryId
    }, order);
    const countArticle = await this.articleService.countRows(q.search, {
      categoryId: q.categoryId
    });
    
    return {
      totalRow: countArticle,
      data: article
    };
  }
  
  @Get('/article/:id')
  findOneArticle(@Param('id') id: string) {
    return this.articleService.findOneById(+id);
  }

  @Get('/article-comment')
  async findAllArticleComment(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: keyof ArticleComment,
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'DESC',
    @Query() q: any,
  ) {
    const order = orderBy ? { [orderBy]: orderType } : { id: 'DESC' as 'ASC' | 'DESC' };
    const articleComment = await this.articleCommentService.findAll(page, pageSize, q.search, {
      articleId: q.articleId
    }, order);
    const countArticleComment = await this.articleCommentService.countRows(q.search, {
      articleId: q.articleId
    });

    return {
      totalRow: countArticleComment,
      data: articleComment
    };
  }

  @Get('/article-comment/:id')
  findOneArticleComment(@Param('id') id: string) {
    return this.articleCommentService.findOneById(+id);
  }

  @Get('/article-category')
  async findAllArticleCategory(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: keyof ArticleCategory,
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'DESC',
    @Query() q: any,
  ) {
    const order = orderBy ? { [orderBy]: orderType } : { id: 'DESC' as 'ASC' | 'DESC' };
    const articleCategory = await this.articleCategoryService.findAll(page, pageSize, q.search, order);
    const countArticleCategory = await this.articleCategoryService.countRows(q.search);
    
    return {
      totalRow: countArticleCategory,
      data: articleCategory
    };
  }

  @Get('/article-category/:id')
  findOneArticleCategory(@Param('id') id: string) {
    return this.articleCategoryService.findOneById(+id);
  }

}
