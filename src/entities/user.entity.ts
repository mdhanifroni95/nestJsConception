import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { string } from "zod";
import { PropertyEntity } from "./property.entity";
import { join } from "path";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string;

    @Column()
    avatarUrl: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    createdBy: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column()
    updatedBy: number;

    @OneToMany(() => PropertyEntity, (property) => property.user)
    properties: PropertyEntity[];

    @ManyToMany(() => PropertyEntity, (property) => property.likedBy)
    @JoinTable({ name: "user_liked_properties" })
    likedProperties: PropertyEntity[];

}