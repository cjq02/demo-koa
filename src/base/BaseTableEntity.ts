import { PrimaryGeneratedColumn, Column } from 'typeorm';

export default abstract class BaseTableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp' })
    createAt: Date;

    @Column()
    createUserId: string;

    @Column({ type: 'timestamp', nullable: true })
    updateAt: Date;

    @Column({ nullable: true })
    updateUserId: string;

}