import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./property.entity";

@Entity({ name: "property_features" })
export class PropertyFeatureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  hasSwimmingPool: boolean;

  @Column()
  hasGardenYard: boolean;

  @Column()
  hasGarage: boolean;

  @Column()
  hasParking: boolean;

  @Column()
  hasPool: boolean;

  @OneToOne(() => PropertyEntity, (property) => property.propertyFeatures)
  property: PropertyEntity
}
