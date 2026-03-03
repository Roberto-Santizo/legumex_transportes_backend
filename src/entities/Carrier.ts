import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarrierUser, User } from "./entity";

@Entity()
export class Carrier {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => CarrierUser, (user) => user.carrier, { eager: false, nullable: true })
    users: CarrierUser[];

    @CreateDateColumn()
    createdAt: Date;
}
