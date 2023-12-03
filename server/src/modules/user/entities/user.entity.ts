import {
    Column,
    Model,
    DataType,
    Table,
    BelongsToMany,
    BeforeUpdate,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';
import { Role } from '../../role/role.entity';

@Table({
    tableName: 'users',
    timestamps: false,
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        allowNull: true,
    })
    username: string;

    @Column({
        allowNull: false,
    })
    fullname: string;

    @Column({
        allowNull: true,
    })
    gender: string;

    @Column({
        allowNull: true,
    })
    address: string;

    @Column({
        allowNull: true,
    })
    password: string;

    @Column({
        allowNull: true,
    })
    email: string;

    @Column({
        allowNull: true,
    })
    google: string;

    @Column({
        allowNull: true,
    })
    facebook: string;

    @Column({
        allowNull: false,
    })
    auth_provider: string;

    @Column({
        allowNull: true,
        defaultValue: false,
    })
    is_verified: boolean;

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
        type: DataType.TEXT,
        allowNull: true,
    })
    img_url: string;

    @Column({
        allowNull: true,
    })
    access_token: string;

    @Column({
        allowNull: true,
    })
    refresh_token: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @BeforeUpdate
    static runBeforeUpdate(instance: User) {
        instance.updated_at = new Date();
    }
}
