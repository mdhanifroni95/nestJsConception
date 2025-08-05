import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { PropertyFeatureEntity } from "./propertyFeature.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "properties" })
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @Column({ default: 0 })
  created_by: number;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  updated_by: number;

  @OneToOne(() => PropertyFeatureEntity, (features) => features.property)
  @JoinColumn({ name: "property_feature_id" })
  propertyFeatures: PropertyFeatureEntity

  @ManyToOne(() => UserEntity, (user) => user.properties)
  @JoinColumn({ name: "ownerId" })
  user: UserEntity

  @ManyToMany(() => UserEntity, (user) => user.likedProperties)
  likedBy: UserEntity[];
}
