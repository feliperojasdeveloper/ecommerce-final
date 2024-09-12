import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service";
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt";

describe('Product controller', () => {
    let controller: ProductsController;
    let mockProductService: Partial<ProductsService>;

    const mockProducts = [
        {
            "id": "1d953139-0d2d-4394-8704-6c27cd5b5988",
            "name": "Logitech G502 Pro",
            "description": "The best mouse in the world",
            "price": "39.99",
            "stock": 12,
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlD4SM3bP21AGk55HNwuNciWacGZ3_togIA&s",
            "category": {
                "id": "5816bfc0-05f8-4138-a078-f35f0926a804",
                "name": "mouse"
            }
        },
        {
            "id": "c7847cb9-f06f-4d8f-8df1-ae872abb80e7",
            "name": "SteelSeries Rival 3",
            "description": "The best mouse in the world",
            "price": "29.99",
            "stock": 12,
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlD4SM3bP21AGk55HNwuNciWacGZ3_togIA&s",
            "category": {
                "id": "5816bfc0-05f8-4138-a078-f35f0926a804",
                "name": "mouse"
            }
        }];

     const mockProductUpdate = {
        "name": "Logitech G502 Pro",
        "description": "The best mouse in the world",
        "price": 39.99,
        "stock": 12,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlD4SM3bP21AGk55HNwuNciWacGZ3_togIA&s",
    }

    beforeEach(async () => {
        mockProductService = {
            getProducts: jest.fn().mockReturnValue(mockProducts),
            getProductById: jest.fn().mockReturnValue(mockProducts[0]),
            updateProduct: jest.fn().mockReturnValue(true)
        };

        const mockJwtService = {
            sign: (payLoad) => jwt.sign(payLoad, 'testSecret')
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: ProductsService,
                useValue: mockProductService
            }, {
                provide: JwtService,
                useValue: mockJwtService
            }],
            controllers: [ProductsController]
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it("Should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("Should return products with pagination", async () => {
        expect(await controller.getProducts(1, 5)).toBe(mockProducts)
        expect(mockProductService.getProducts).toHaveBeenCalledWith(1, 5);
    });

    it("getProductById() Should return a product by id", async () => {
        expect(await controller.getProductById(mockProducts[0].id)).toBe(mockProducts[0]);
        expect(mockProductService.getProductById).toHaveBeenCalledWith(mockProducts[0].id);
    });

    it("update() should return a updated Product id", async () => {
        expect(await controller.updateProduct(mockProducts[0].id, mockProductUpdate)).toBe(mockProducts[0].id);
        expect(mockProductService.updateProduct).toHaveBeenCalledWith('1d953139-0d2d-4394-8704-6c27cd5b5988', mockProductUpdate);
    })
})