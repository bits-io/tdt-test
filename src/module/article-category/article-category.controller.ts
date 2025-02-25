import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { ArticleCategory } from './entities/article-category.entity';
import { Roles } from 'src/helpers/decorator.helper';
import { UserRoleGuard } from 'src/guards/user-role.guard';

@Controller('article-category')
export class ArticleCategoryController {
  constructor(private readonly articleCategoryService: ArticleCategoryService) {}

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Post()
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryService.create(createArticleCategoryDto);
  }

  @Get()
  async findAll(
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleCategoryService.findOneById(+id);
  }

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleCategoryDto: UpdateArticleCategoryDto) {
    return this.articleCategoryService.update(+id, updateArticleCategoryDto);
  }

  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleCategoryService.remove(+id);
  }
}
