import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarrierVehicle, VehicleBrand } from "./entity";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    name: string;

    @Column('float', { default: 0 })
    autonomy: number;

    @Column()
    image: string;

    @Column()
    year: string;

    @ManyToOne(() => VehicleBrand, (brand) => brand.vehicles, { eager: false, nullable: false })
    @JoinColumn({ name: 'vehicle_brand_id' })
    brand: VehicleBrand;

    @OneToMany(() => CarrierVehicle, (vehicle) => vehicle.vehicle, { eager: false, nullable: true })
    vehicles: CarrierVehicle[];

    @CreateDateColumn()
    createdAt: Date;
}
