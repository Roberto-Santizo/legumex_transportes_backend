import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carrier, Vehicle } from "./entity";

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

    @ManyToOne(() => Carrier, (carrier) => carrier.vehicles, { eager: true, nullable: false })
    @JoinColumn({ name: 'carrier_id' })
    carrier: Carrier;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicles, { eager: true, nullable: true })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

    @CreateDateColumn()
    createdAt: Date;
}
