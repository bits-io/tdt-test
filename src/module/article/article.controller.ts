import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { UserRoleGuard } from 'src/guards/user-role.guard';
import { Roles, UserSession } from 'src/helpers/decorator.helper';
import { User } from '../user/entities/user.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UserSession() user: User
  ) {
    return this.articleService.create({
      ...createArticleDto,
      userId: user.id
    });
  }

  @Get()
  async findAll(
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOneById(+id);
  }

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateArticleDto: UpdateArticleDto,
    @UserSession() user: User,
  ) {
    return this.articleService.update(+id, {
      ...updateArticleDto,
      userId: user.id
    });
  }

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
