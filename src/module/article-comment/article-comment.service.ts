import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleComment } from './entities/article-comment.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ArticleCommentService {

  constructor(
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  async create(createArticleCommentDto: CreateArticleCommentDto) {
    const article = await this.articleService.findOneById(createArticleCommentDto.articleId);
    if (!article) throw new BadRequestException('Invalid select category');

    const user = await this.userService.findOneById(createArticleCommentDto.userId);
    if (!user) throw new BadRequestException('Invalid select user');
        
    return await this.articleCommentRepository.save({
      ...createArticleCommentDto,
      article: article,
      user: user,
    });
  }

  async countRows(
    search?: string, 
    options?: { articleId?: number, userId?: number }
  ) {
    let criteria: FindOptionsWhere<ArticleComment> | FindOptionsWhere<ArticleComment>[];
    if (search) {
      criteria = { 
        comment: ILike(`%${search}%`) 
      };
    }
  
    if (options?.articleId) {
      criteria = {
        ...criteria,
        article: { id: options.articleId }
      }
    }

    if (options?.userId) {
      criteria = {
        ...criteria,
        user: { id: options.userId }
      }
    }
    
    return await this.articleCommentRepository.count({
      where: criteria,
    });
  }
    
  async findAll(
    page: number = 1, 
    take: number = 25, 
    search?: string,
    options?: { articleId?: number, userId?: number },
    order: { [P in keyof ArticleComment]?: 'ASC' | 'DESC' } = { id: 'DESC' }
  ) {
    let criteria: FindOptionsWhere<ArticleComment> | FindOptionsWhere<ArticleComment>[];
    if (search) {
      criteria = { 
        comment: ILike(`%${search}%`) 
      };
    }
  
    if (options?.articleId) {
      criteria = {
        ...criteria,
        article: { id: options.articleId }
      }
    }

    if (options?.userId) {
      criteria = {
        ...criteria,
        user: { id: options.userId }
      }
    }
    
    return await this.articleCommentRepository.find({
      skip: (page - 1) * take,
      take: take,
      where: criteria,
      relations: { article: true, user: true },
      order: order
    });
  }

  async findOneById(id: number) {
    if (!id) throw new BadRequestException('Param id is required');
        
    const articleComment = await this.articleCommentRepository.findOne({ 
      where: { id },  
      relations: { article: true, user: true }
    });
    if (!articleComment) throw new NotFoundException('Article comment not found');
        
    return articleComment;
  }

  async update(id: number, updateArticleCommentDto: UpdateArticleCommentDto) {
    const articleComment = await this.findOneById(id);
    if (!articleComment) throw new NotFoundException('Article comment not found');

    if (updateArticleCommentDto.articleId) {
      const article = await this.articleService.findOneById(updateArticleCommentDto.articleId);
      if (!article) throw new BadRequestException('Invalid select article');
      articleComment.article = article;
    }

    if (updateArticleCommentDto.userId) {
      const user = await this.userService.findOneById(updateArticleCommentDto.userId);
      if (!user) throw new BadRequestException('Invalid select user');
      articleComment.user = user;
    }

    articleComment.updatedAt = new Date();

    Object.assign(articleComment, updateArticleCommentDto);

    return await this.articleCommentRepository.save(articleComment);
  }

  async remove(id: number) {
    const articleComment = await this.findOneById(id);
    if (!articleComment) throw new NotFoundException('Article comment not found');

    return await this.articleCommentRepository.softDelete({ id });
  }
}
