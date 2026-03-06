import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Token, Trip } from "./entity";
import { CarrierUser } from "./entity";

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

    @Column({ nullable: true })
    profilePicture: string;

    @OneToOne(() => CarrierUser, (carrier) => carrier.user, { eager: true, nullable: true })
    carrier: CarrierUser;

    @OneToMany(() => Token, (token) => token.user, { eager: false })
    tokens: Token[];

    @OneToMany(() => Trip, (trip) => trip.user, { eager: false, nullable: true })
    trips: Trip[];

    @CreateDateColumn()
    createdAt: Date;
}
