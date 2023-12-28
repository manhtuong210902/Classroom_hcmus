import { Column, Model, DataType, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "files",
    timestamps: false
})
export class File extends Model<File> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    file_name: string;
  
    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    original_name: string;
  
    @Column({ 
        type: DataType.BLOB('long'), 
        allowNull: false 
    })
    buffer: Buffer;
  
    @Column({ 
        type: DataType.INTEGER, 
        allowNull: false 
    })
    size: number;

}