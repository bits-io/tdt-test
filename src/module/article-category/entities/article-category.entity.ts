import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('article_category')
export class ArticleCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
        
    @Column({ nullable: true })
    name: string;                                    
        
    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
