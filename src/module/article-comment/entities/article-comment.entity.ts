import { Article } from "src/module/article/entities/article.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('article_comment')
export class ArticleComment {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
    
    @ManyToOne(() => Article)
    @JoinColumn()
    article: Article;
            
    @Column({ nullable: true, type: 'text' })
    comment: string;                                    
            
    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
            
    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
            
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date; 
}
