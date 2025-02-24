import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './module/auth/auth.guard';
import { AuthMiddleware } from './module/auth/auth.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './configs/database.config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { IsUnique } from './helpers/decorator.helper';
import { ArticleModule } from './module/article/article.module';
import { ArticleCategoryModule } from './module/article-category/article-category.module';
import { ArticleCommentModule } from './module/article-comment/article-comment.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    AuthModule,
    UserModule,
    ArticleModule,
    ArticleCategoryModule,
    ArticleCommentModule,    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    IsUnique
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthMiddleware,
      ).forRoutes('*');
  }
}
