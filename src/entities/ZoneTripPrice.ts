import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crop, ZoneFuelPrice } from "./entity";

@Entity()
export class ZoneTripPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    price_per_lb: number;

    @Column('date')
    start_date: Date;

    @Column('bool', { default: true })
    status: boolean;

    @ManyToOne(() => ZoneFuelPrice, (price) => price.zoneCropPrices, { eager: true })
    @JoinColumn({ name: 'zone_fuel_price_id' })
    fuelPrice: ZoneFuelPrice;

    @ManyToOne(() => Crop, (crop) => crop.zonePrices, { eager: true })
    @JoinColumn({ name: 'crop_id' })
    crop: Crop;

    @CreateDateColumn()
    createdAt: Date;
}