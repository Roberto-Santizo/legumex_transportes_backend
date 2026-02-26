import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./entity";

@Entity()
export class VehicleBrand {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.brand)
    vehicles: VehicleBrand[];

    @CreateDateColumn()
    createdAt: Date;
}
