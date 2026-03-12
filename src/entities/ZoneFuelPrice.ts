import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Zone } from "./entity";

@Entity()
export class ZoneFuelPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    fuel_range: number;

    @ManyToOne(() => Zone, (zone) => zone.prices)
    @JoinColumn({ name: 'zone_id' })
    zone: Zone;

    @CreateDateColumn()
    createdAt: Date;
}