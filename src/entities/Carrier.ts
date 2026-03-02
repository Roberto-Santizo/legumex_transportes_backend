import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Carrier {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    createdAt: Date;
}
