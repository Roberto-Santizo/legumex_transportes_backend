import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fuel } from "./Fuel";

@Entity()
export class FuelPrice {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    price: number;

    @Column('boolean')
    isActive: boolean;

    @ManyToOne(() => Fuel, fuel => fuel.prices)
    @JoinColumn({ name: 'fuel_id' })
    fuel: Fuel;

    @Column('timestamp')
    createdAt: Date;

    @Column('timestamp')
    activatedAt: Date;
}