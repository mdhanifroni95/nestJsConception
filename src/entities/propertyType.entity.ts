import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "property_types" })
export class PropertyTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;
}