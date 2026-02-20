import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => Token, (token) => token.user, { eager: false })
    tokens: Token[];

    @CreateDateColumn()
    createdAt: Date;
}
