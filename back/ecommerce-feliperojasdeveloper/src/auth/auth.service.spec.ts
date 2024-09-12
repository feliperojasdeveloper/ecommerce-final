import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service";
import { UserRepository } from "../users/users.repository";
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/users/dto/create-user.dto";

describe('Auth service', () => {
    let service: AuthService;
    let mockUserRepository: Partial<UserRepository>;
    let mockJwtService;

    const mockUser: CreateUserDto = {
        "name": "NLopez",
        "email": "nlopez@test.com",
        "phone": 1234,
        "country": "Colombia",
        "address": "carrera 39 # 2a - 57",
        "city": "Cali co",
        "isAdmin": false,
        "password": "Nlopez2024*",
        "confirmpassword": "Nlopez2024*"
    }

    beforeEach(async () => {
        mockUserRepository = {
            getUserByEmail: jest.fn().mockResolvedValue(mockUser),
            createUser: jest.fn().mockResolvedValue({...mockUser, id: "1234"}),
        }

        mockJwtService = {
            sign: jest.fn().mockReturnValue('mocked-token'),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UserRepository,
                useValue: mockUserRepository
            }, {
                    provide: JwtService,
                    useValue: mockJwtService
                }]
        }).compile();

        service = module.get<AuthService>(AuthService);

    });

    it('Should be defined', () => {
        expect(service).toBeDefined()
    });

    it('Return a toke, if credential are valid', async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        const result = await service.signIn(mockUser.email, mockUser.password);
        expect(result).toEqual({ success: "Usuario logueado correctamente", token: 'mocked-token' })
    })

    it('should create a new user if email does not exist', async () => {
        const hashedPassword = 'hashedPassword';
        bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
        mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue(null);
        mockUserRepository.createUser = jest.fn().mockResolvedValue({...mockUser, password: hashedPassword });

        const result = await service.signUp(mockUser)
        expect(result).toEqual({
            "name": "NLopez",
            "email": "nlopez@test.com",
            "phone": 1234,
            "country": "Colombia",
            "address": "carrera 39 # 2a - 57",
            "city": "Cali co",
            "isAdmin": false,
            "confirmpassword": "Nlopez2024*"
         });
        expect(bcrypt.hash).toHaveBeenLastCalledWith(mockUser.password, 10);


    });
})