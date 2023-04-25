import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'works'})
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    hidden: boolean;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    file: string;
}