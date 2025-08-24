import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { string } from "zod";
import { PropertyEntity } from "./property.entity";
import { join } from "path";
import * as bcrypt from "bcrypt";
import { Role } from "src/auth/enums/role.enum";

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

    @Column({ default: '' })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role

    @Column({ nullable: true })
    hashedRefreshToken: string;

    @Column({ default: '' })
    avatarUrl: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ default: 0 })
    createdBy: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ default: 0 })
    updatedBy: number;

    @OneToMany(() => PropertyEntity, (property) => property.user)
    properties: PropertyEntity[];

    @ManyToMany(() => PropertyEntity, (property) => property.likedBy)
    @JoinTable({ name: "user_liked_properties" })
    likedProperties: PropertyEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}