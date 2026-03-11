import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;
}