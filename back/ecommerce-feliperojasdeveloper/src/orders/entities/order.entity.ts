import { OrderDetail } from "../../order-details/entities/order-detail.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'date'
    })
    date: Date;

    @ManyToOne(() => User, (user) => user.orders, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail;
}
