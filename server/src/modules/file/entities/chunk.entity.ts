import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
    tableName: "chunks",
    timestamps: false
})
export class Chunk extends Model<Chunk> {
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

    @ForeignKey(()=> User)
    @Column({
        type: DataType.UUID,
    })
    uploader: string
  
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    chunk_index: number;

    @Column({ 
        type: DataType.BLOB('long'), 
        allowNull: false 
    })
    buffer: Buffer;
  
}