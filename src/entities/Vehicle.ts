import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleBrand } from "./entity";

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
    
    @ManyToOne(() => VehicleBrand, (brand) => brand.vehicles, { eager: true, nullable: false })
    @JoinColumn({ name: 'vehicle_brand_id' })
    brand: VehicleBrand;

    @CreateDateColumn()
    createdAt: Date;
}
