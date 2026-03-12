import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Zone, ZoneTripPrice } from "./entity";

@Entity()
export class ZoneFuelPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    fuel_range: number;

    @ManyToOne(() => Zone, (zone) => zone.prices)
    @JoinColumn({ name: 'zone_id' })
    zone: Zone;

    @OneToMany(() => ZoneTripPrice, (tripPrice) => tripPrice.fuelPrice)
    zoneCropPrices: ZoneTripPrice[];

    @CreateDateColumn()
    createdAt: Date;
}