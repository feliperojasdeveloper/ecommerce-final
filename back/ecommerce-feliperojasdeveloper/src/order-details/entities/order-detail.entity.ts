import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'orders_details'
})
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToMany(()=> Product)
    @JoinTable({name: 'order_details_products'})
    products: Product[];

}
