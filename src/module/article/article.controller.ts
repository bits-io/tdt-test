import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { UserRoleGuard } from 'src/guards/user-role.guard';
import { Roles } from 'src/helpers/decorator.helper';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
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
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
