import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    origin_lat: number;

    @Column('float')
    origin_lng: number;

    @Column('int', { default: 1 })
    status: number;

    @Column('float')
    total_pounds: number;

    @Column('timestamp')
    operation_date: Date

    @CreateDateColumn()
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

    @Column()
    polyline: string;

    @ManyToOne(() => Carrier, (carrier) => carrier.trips, { nullable: false })
    @JoinColumn({ name: 'carrier_id' })
    carrier: Carrier;

    @ManyToOne(() => User, (user) => user.trips, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
