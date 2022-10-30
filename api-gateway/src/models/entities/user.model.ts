import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    database: "hammerspace",
    name: "userClients",
    schema: "public"
})
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({name: "fullname"})
    fullname!: string;

    @Column()
    isactive!: boolean;

    @Column()
    isdeleted!: boolean;
}