import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true, nullable: true })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true, type: 'text' })
    resetPasswordToken: string;
    
    @Column({ nullable: true, type: 'timestamp' })
    emailVerifiedAt: string;

    @Column({ type: 'text', nullable: true })
    fcmToken: string;
    
    @Column({ type: 'text', nullable: true })
    avatar: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;    
}
