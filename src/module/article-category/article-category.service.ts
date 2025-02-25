import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategory } from './entities/article-category.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class ArticleCategoryService {

  constructor(
    @InjectRepository(ArticleCategory)
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) { }

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    return await this.articleCategoryRepository.save(createArticleCategoryDto);
  }

  async countRows(search?: string) {
    let criteria: FindOptionsWhere<ArticleCategory> | FindOptionsWhere<ArticleCategory>[];
    if (search) {
      criteria = [
        { name: ILike(`%${search}%`) }
      ];
    }

    return await this.articleCategoryRepository.count({
      where: criteria,
    });
  }

  async findAll(page: number = 1, take: number = 25, search?: string, order: { [P in keyof ArticleCategory]?: 'ASC' | 'DESC' } = { id: 'DESC' }) {
    let criteria: FindOptionsWhere<ArticleCategory> | FindOptionsWhere<ArticleCategory>[];
    if (search) {
      criteria = [
        { name: ILike(`%${search}%`) }
      ];
    }

    return await this.articleCategoryRepository.find({
      skip: (page - 1) * take,
      take: take,
      where: criteria,
      order: order
    });
  }

  async findOneById(id: number) {
    if (!id) throw new BadRequestException('Param id is required');

    const articleCategory = await this.articleCategoryRepository.findOneBy({ id });
    if (!articleCategory) throw new NotFoundException('Article category not found');

    return articleCategory;
  }

  async update(id: number, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    const articleCategory = await this.findOneById(id);

    if (!articleCategory) throw new NotFoundException('Article category not found');

    articleCategory.updatedAt = new Date();

    Object.assign(articleCategory, updateArticleCategoryDto);

    return await this.articleCategoryRepository.save(articleCategory);
  }

  async remove(id: number) {
    const articleCategory = await this.findOneById(id);
    if (!articleCategory) throw new NotFoundException('Article category not found');

    return await this.articleCategoryRepository.softDelete({ id });
  }
}
