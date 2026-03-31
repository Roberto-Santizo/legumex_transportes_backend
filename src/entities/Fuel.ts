import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FuelPrice } from "./FuelPrice";

@Entity()
export class Fuel {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => FuelPrice, price => price.fuel)
    prices: FuelPrice[];

    @CreateDateColumn()
    createdAt: Date;
}