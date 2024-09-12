import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { UserRepository } from '../src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<UserRepository>;
  let jwtService: JwtService;

  const mockUser = {
    name: "NLopez",
    email: "nlopez@test.com",
    phone: 1234,
    country: "Colombia",
    address: "carrera 39 # 2a - 57",
    city: "Cali co",
    isAdmin: false,
    password: "Nlopez2024*",
    confirmpassword: "Nlopez2024*"
  }

  beforeEach(async () => {
    mockUsersRepository = {
      getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(UserRepository)
      .useValue(mockUsersRepository)
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
  })

})