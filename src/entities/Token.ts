import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    token: string;

    @ManyToOne(() => User, (user) => user.tokens, { eager: true, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
