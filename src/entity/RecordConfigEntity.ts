import { Entity, Column } from 'typeorm';
import RecordTypeEnum from '../enumerate/RecordTypeEnum';
import BaseTableEntity from '../base/BaseTableEntity';

@Entity("t_dr_record_config")
export default class RecordConfigEntity extends BaseTableEntity {

    @Column({ unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: RecordTypeEnum
    })
    type: RecordTypeEnum
}