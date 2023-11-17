import { Column, Model, DataType, Table, BelongsToMany, BeforeUpdate} from 'sequelize-typescript';
import { UserRole } from '../user-role/user-role.entity';
import { Role } from '../role/role.entity';

@Table({
    "tableName": "users",
    "timestamps": false
})
export class User extends Model<User>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        allowNull: false,
    })
    username: string;

    @Column({
        allowNull: false,
    })
    password: string;

    @Column({
        allowNull: false
    })
    email: string;

    @Column({
        defaultValue: DataType.NOW, 
        allowNull: false,
    })
    created_at: Date;

    @Column({
        allowNull: true,
    })
    updated_at?: Date;

    @Column({
        allowNull: true,
    })
    img_url : string;

    @Column({
        allowNull: true,
    })
    access_token: string;

    @Column({
        allowNull: true,
    })
    refresh_token: string;

    @BelongsToMany(()=>Role,() => UserRole)
    roles: Role[];

    @BeforeUpdate
    static runBeforeUpdate(instance: User) {
        instance.updated_at = new Date();
    }
}