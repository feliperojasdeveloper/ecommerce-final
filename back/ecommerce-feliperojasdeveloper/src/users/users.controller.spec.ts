import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../auth/guards/auth.guard";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("Users Controller", () => {
    let controller: UsersController;
    let mockUsersService: Partial<UsersService>;
    let mockJwtService: Partial<JwtService>;

    const mockUser = {
        "id": "949f3eef-4eb7-4e0a-8b01-edbc27a873ca",
        "name": "NLopez",
        "email": "nlopez@test.com",
        "phone": 1234,
        "country": "Colombia",
        "address": "carrera 39 # 2a - 57",
        "city": "Cali co",
        "isAdmin": false
    }

    beforeEach(async () => {
        mockUsersService = {
            getUsers: jest.fn().mockReturnValue([]),
            getUserById: jest.fn().mockReturnValue(mockUser),
            updateUser: jest.fn(),
            deleteUser: jest.fn()
        }

        mockJwtService = {
            sign: jest.fn().mockReturnValue("toke-jwt-prueba")
        }


        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{
                provide: UsersService,
                useValue: mockUsersService
            }, {
                provide: JwtService,
                useValue: mockJwtService
            }]
        }).overrideGuard(AuthGuard).useValue({ canActive: () => true }).compile();

        controller = module.get<UsersController>(UsersController);
        mockUsersService = module.get<UsersService>(UsersService);
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Get users returns an array of users', async () => {
        const result = await controller.getUsers(1, 10);
        expect(result).toEqual([]);
        expect(mockUsersService.getUsers).toHaveBeenCalledWith(1, 10);
    })

    it('Get an user by email', async () => {
        const result = await controller.getUserById(mockUser.id);
        expect(result).toEqual(mockUser);
        expect(mockUsersService.getUserById).toHaveBeenCalledWith("949f3eef-4eb7-4e0a-8b01-edbc27a873ca");
    })

    it('GetUserById() Returns an error if the id isnt found', async () => {
        mockUsersService.getUserById = jest.fn().mockReturnValue(null);
        await expect(controller.getUserById(mockUser.id)).rejects.toThrow(new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND));
        expect(mockUsersService.getUserById).toHaveBeenCalledWith(mockUser.id);
    })

    it('UpdateUser() successfully updates a user', async () => {

        mockUsersService.updateUser = jest.fn().mockResolvedValue(true);
        const updatedUser = {
            "email": "leidyperez2@correo.com",
            "name": "Leidy Vanesa Perez Bedoya",
            "password": "LPerez2025",
            "address": "Calle 7 25-39",
            "phone": 31840,
            "country": "Colombia",
            "city": "Cali"
        };
        const result = await controller.updateUser(mockUser.id, updatedUser);
        expect(result).toEqual(mockUser.id);
        expect(mockUsersService.updateUser).toHaveBeenCalledWith(mockUser.id, updatedUser);
    });

    it('delte() sucessfully deletes a user' , async () => {
        mockUsersService.deleteUser = jest.fn().mockResolvedValue(true);
        const result = await controller.deleteUser(mockUser.id);
        expect(result).toEqual(mockUser.id);
        expect(mockUsersService.deleteUser).toHaveBeenCalledWith(mockUser.id);
    })
})