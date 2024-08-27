import { Injectable } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class OrderRepository {

    constructor(@InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Order) private orderRepository
    ) { }

    async addOrder(userId: string, products: any): Promise<any>{
        let total = 0;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            return "Usuario no encontrado";
        }

        const order = new Order();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.orderRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productRepository.findOneBy({
                    id: element.id,
                });

                if (!product) {
                    return "Producto no encontrado";
                }

                total += Number(product.price);

                await this.productRepository.update(
                    { id: element.id },
                    { stock: product.stock - 1 },
                );                
                return product;
            }),
        );

        const orderDetail = new OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;      


        await this.orderDetailRepository.save(orderDetail);

        return await this.orderRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: true,
            }
        });
    }

    async getOrder(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true             
                }
            }
        })

        if(!order) {
            return "Orden no encontrada";
        }

        return order;
    }
}