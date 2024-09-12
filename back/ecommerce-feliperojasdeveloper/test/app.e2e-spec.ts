import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { UserRepository } from '../src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProductRepository } from '../src/products/products.repository';
import { CategoryRepository } from '../src/categories/categories.repository';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<UserRepository>;
  let mockProductRepository: Partial<ProductRepository>;
  let mockCategoryRepository: Partial<CategoryRepository>;
  let jwtService: Partial<JwtService>;

  const mockUser = {
    name: "NLopez",
    email: "nlopez@test.com",
    phone: 1234,
    country: "Colombia",
    address: "carrera 39 # 2a - 57",
    city: "Cali co",
    isAdmin: true,
    password: "Nlopez2024*",
    confirmpassword: "Nlopez2024*"
  }

  const mockProduct = {
    id: "1d953139-0d2d-4394-8704-6c27cd5b5988",
    name: "Logitech G502 Pro",
    description: "The best mouse in the world",
    price: "39.99",
    stock: 12,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlD4SM3bP21AGk55HNwuNciWacGZ3_togIA&s",
    category: {
      "id": "5816bfc0-05f8-4138-a078-f35f0926a804",
      "name": "mouse"
    }
  }

  const mockCategory = {
    "id": "fa53d14a-6f3b-4e26-9695-f87f325734ec",
    "name": "smartphone"
  }


  beforeEach(async () => {
    mockUsersRepository = {
      getUserByEmail: jest.fn().mockResolvedValue(mockUser),
      getUsers: jest.fn().mockResolvedValue([mockUser]),
    }

    mockProductRepository = {
      getProducts: jest.fn().mockResolvedValue([mockProduct]),
      getProductById: jest.fn().mockResolvedValue(mockProduct),
    }

    mockCategoryRepository = {
      getCategories: jest.fn().mockResolvedValue([mockCategory]),
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(UserRepository)
      .useValue(mockUsersRepository)
      .overrideProvider(ProductRepository)
      .useValue(mockProductRepository)
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === "Nlopez2024*")
    });

  });

  it('auth/signin returns a token', () => {
    return request(app.getHttpServer()).post('/auth/signin').send({ email: mockUser.email, password: mockUser.password })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('token')
        expect(res.body.token).toBeDefined()
      })
  });

  it('/users returns an user array', async () => {
    const token = jwtService.sign({ email: "felipedeveloper@correo.com", isAdmin: true });
    return await request(app.getHttpServer()).get('/users')
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array)
      });
  })

  it("/products returns an products array", async () => {
    return await request(app.getHttpServer()).get('/products')
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array)
      })
  })

  it("/products/:id returns an product", async () => {
    return await request(app.getHttpServer()).get(`/products/${mockProduct.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(mockProduct)
      })
  })

  it("/categories returns an category array", async () => {
    return await request(app.getHttpServer()).get('/categories')
    .expect(200)
    .expect(res => {
      expect(res.body).toBeInstanceOf(Array)
    })
  })


})