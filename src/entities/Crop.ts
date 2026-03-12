import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ZoneTripPrice } from "./entity";

@Entity()
export class Crop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ZoneTripPrice, (tripPrice) => tripPrice.crop)
    zonePrices: ZoneTripPrice[];

    @CreateDateColumn()
    createdAt: Date;
}