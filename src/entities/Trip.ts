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

    @Column('float')
    start_lat: number;

    @Column('float')
    start_lng: number;

    @Column('int', { default: 1 })
    status: number;

    @Column('float')
    total_pounds: number;

    @Column('timestamp')
    operation_date: Date

    @Column('timestamp')
    createdAt: Date;

    @Column('timestamp', { nullable: true })
    start_date: Date

    @Column('timestamp', { nullable: true })
    end_date: Date

    @Column('float')
    estimated_time: number;

    @Column('float')
    estimated_distance: number;

    @Column('float')
    amount_lbs: number;

    @ManyToOne(() => Carrier, (carrier) => carrier.trips, { nullable: false })
    @JoinColumn({ name: 'carrier_id' })
    carrier: Carrier;

    @ManyToOne(() => User, (user) => user.trips, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
