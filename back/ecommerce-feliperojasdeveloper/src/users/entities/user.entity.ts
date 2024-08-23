import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    password: string;
    
    @Column({
        type: 'int'
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    country?: string | undefined;

    @Column({
        type: 'varchar'
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    city?: string | undefined

    @Column({
        type:'boolean',
        default: false
    })
    isAdmin: boolean;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({name: 'orders_id'})
    orders: Order[];

}