import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, Carrier } from "./entity";

export enum CarrierUserFunction {
    admin = 'administrator',
    driver = 'driver'
}

@Entity()
export class CarrierUser {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.carrier, { eager: false, nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Carrier, (carrier) => carrier.users, { eager: true, nullable: false })
    @JoinColumn({ name: "carrier_id" })
    carrier: Carrier;

    @Column({ type: "enum", enum: CarrierUserFunction, default: [CarrierUserFunction.driver] })
    function: string;

    @Column({ type: 'bool', default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
