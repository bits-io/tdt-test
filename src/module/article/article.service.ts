import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ArticleCategoryService } from '../article-category/article-category.service';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private articleCategoryService: ArticleCategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const category = await this.articleCategoryService.findOneById(createArticleDto.categoryId);
    if (!category) throw new BadRequestException('Invalid select category');
    
    return await this.articleRepository.save({
      ...createArticleDto,
      category: category
    });
  }

  async countRows(
    search?: string, 
    options?: { categoryId?: number }
  ) {
    let criteria: FindOptionsWhere<Article> | FindOptionsWhere<Article>[];
    if (search) {
      criteria = { 
        title: ILike(`%${search}%`) 
      };
    }

    if (options?.categoryId) {
      criteria = {
        ...criteria,
        category: { id: options.categoryId }
      }
    }
  
    return await this.articleRepository.count({
      where: criteria,
    });
  }
  
  async findAll(
    page: number = 1, 
    take: number = 25, 
    search?: string,
    options?: { categoryId?: number },
    order: { [P in keyof Article]?: 'ASC' | 'DESC' } = { id: 'DESC' }
  ) {
    let criteria: FindOptionsWhere<Article> | FindOptionsWhere<Article>[];
    if (search) {
      criteria = { 
        title: ILike(`%${search}%`) 
      };
    }

    if (options?.categoryId) {
      criteria = {
        ...criteria,
        category: { id: options.categoryId }
      }
    }
  
    return await this.articleRepository.find({
      skip: (page - 1) * take,
      take: take,
      where: criteria,
      order: order
    });
  }

  async findOneById(id: number) {
    if (!id) throw new BadRequestException('Param id is required');
    
    const article = await this.articleRepository.findOne({ 
      where: { id },  
      relations: { category: true, comment: true }
    });
    if (!article) throw new NotFoundException('Article not found');
    
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOneById(id);
    if (!article) throw new NotFoundException('Article not found');

    if (updateArticleDto.categoryId) {
      const category = await this.articleCategoryService.findOneById(updateArticleDto.categoryId);
      if (!category) throw new BadRequestException('Invalid select category');
      article.category = category;
    }

    article.updatedAt = new Date();

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.findOneById(id);
    if (!article) throw new NotFoundException('Article not found');

    return await this.articleRepository.softDelete({ id });
  }
}
