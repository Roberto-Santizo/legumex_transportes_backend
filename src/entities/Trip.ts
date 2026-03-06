import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carrier, User } from "./entity";

@Entity()
export class Trip {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column('float')
    destination_lat: number;

    @Column('float')
    destination_lng: number;

    @Column('float', { nullable: true })
    start_lat: number;

    @Column('float', { nullable: true })
    start_lng: number;

    @Column('float')
    total_kms: number;

    @Column('float', { nullable: true })
    travel_kms: number;

    @Column('float')
    total_lbs: number;

    @Column('timestamp', { nullable: true })
    start_date: Date;

    @Column('timestamp', { nullable: true })
    end_date: Date;

    @ManyToOne(() => Carrier, (carrier) => carrier.trips, { eager: true, nullable: false })
    @JoinColumn({ name: 'carrier_id' })
    carrier: Carrier[];

    @ManyToOne(() => User, (user) => user.trips, { eager: true, nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
