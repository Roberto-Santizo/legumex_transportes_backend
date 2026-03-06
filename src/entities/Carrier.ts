import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarrierUser, CarrierVehicle, Trip } from "./entity";

@Entity()
export class Carrier {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: false })
    code: string;

    @OneToMany(() => CarrierUser, (user) => user.carrier, { eager: false, nullable: true })
    users: CarrierUser[];
    
    @OneToMany(() => Trip, (trip) => trip.carrier, { eager: false, nullable: true })
    trips: Trip[];
    
    @OneToMany(() => CarrierVehicle, (vehicle) => vehicle.carrier, { eager: false, nullable: true })
    vehicles: CarrierVehicle[];

    @CreateDateColumn()
    createdAt: Date;
}
