import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { ArticleComment } from './entities/article-comment.entity';
import { User } from '../user/entities/user.entity';
import { UserSession } from 'src/helpers/decorator.helper';

@Controller('article-comment')
export class ArticleCommentController {
  constructor(private readonly articleCommentService: ArticleCommentService) {}

  @Post()
  create(
    @Body() createArticleCommentDto: CreateArticleCommentDto,
    @UserSession() user: User,
  ) {
    return this.articleCommentService.create({
      ...createArticleCommentDto,
      userId: user.id
    });
  }

  @Get()
  async findAll(
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleCommentService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateArticleCommentDto: UpdateArticleCommentDto,
    @UserSession() user: User,
  ) {
    return this.articleCommentService.update(+id, {
      ...updateArticleCommentDto,
      userId: user.id
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleCommentService.remove(+id);
  }
}
