import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProductsService', () => {
    let service: ProductsService;
    let mockProductRepository: Partial<ProductRepository>;


    beforeEach(async () => {
        mockProductRepository = {
            getProducts: jest.fn(),
            getProductById: jest.fn(),
            updateProduct: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, {
                provide: ProductRepository,
                useValue: mockProductRepository
            }],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        mockProductRepository = module.get<ProductRepository>(ProductRepository)
    });

    it("Should be defined", () => {
        expect(service).toBeDefined()
    });

});
