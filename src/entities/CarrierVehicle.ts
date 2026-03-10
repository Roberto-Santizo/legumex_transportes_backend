import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carrier, Vehicle } from "./entity";

export enum FuelType {
    gasoline = 'gasoline',
    diesel = 'diesel'
}

@Entity()
export class CarrierVehicle {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    plate: string;

    @Column({ nullable: true })
    image: string;

    @Column('boolean', { default: true })
    status: boolean;

    @Column('float', { default: 0 })
    total_kms: number;

    @Column('float', { default: 0 })
    max_weight: number;

    @Column({ type: "enum", enum: FuelType, default: [FuelType.gasoline] })
    fuel_type: number;

    @ManyToOne(() => Carrier, (carrier) => carrier.vehicles, { eager: true, nullable: false })
    @JoinColumn({ name: 'carrier_id' })
    carrier: Carrier;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicles, { eager: true, nullable: true })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

    @CreateDateColumn()
    createdAt: Date;
}
