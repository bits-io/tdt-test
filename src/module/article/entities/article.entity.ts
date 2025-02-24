import { Exclude } from "class-transformer";
import { ArticleCategory } from "src/module/article-category/entities/article-category.entity";
import { ArticleComment } from "src/module/article-comment/entities/article-comment.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    
    @Column({ nullable: true })
    title: string;        
    
    @Column({ nullable: true, type: 'text' })
    content: string;    

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => ArticleCategory)
    @JoinColumn()
    category: ArticleCategory;
    
    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
    
    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
    
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;  

    @OneToMany(() => ArticleComment, comment => comment.article)
    comment: ArticleComment[];
}
