import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;
}
