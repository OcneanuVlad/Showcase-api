import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'works'})
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;
}