import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarrierUser } from "./entity";

@Entity()
export class Carrier {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: false })
    code: string;

    @OneToMany(() => CarrierUser, (user) => user.carrier, { eager: false, nullable: true })
    users: CarrierUser[];

    @CreateDateColumn()
    createdAt: Date;
}
