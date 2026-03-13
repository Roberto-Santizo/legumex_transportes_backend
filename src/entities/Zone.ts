import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ZoneFuelPrice } from "./entity";

@Entity()
export class Zone {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "geography",
    spatialFeatureType: "Polygon",
    srid: 4326
  })
  area: Object;

  @OneToMany(() => ZoneFuelPrice, (price) => price.zone, {eager: true})
  prices: ZoneFuelPrice[];

  @CreateDateColumn()
  createdAt: Date;
}