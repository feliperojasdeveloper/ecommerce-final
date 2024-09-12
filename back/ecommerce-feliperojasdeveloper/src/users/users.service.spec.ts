import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
import { UserRepository } from "./users.repository";

describe('Users Service', () => {

    let service: UsersService;
    let mockUserRepository: Partial<UserRepository>;

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
        mockUserRepository = {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, {
                provide: UserRepository,
                useValue: mockUserRepository
            }],
        }).compile();

        service = module.get<UsersService>(UsersService);
        mockUserRepository = module.get<UserRepository>(UserRepository);
    })

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });

    it("getUsers service should call a get user repository", async () => {
        await service.getUsers(1, 5);
        expect(mockUserRepository.getUsers).toHaveBeenCalledWith(1, 5);
    });

    it("getUserById service should call a getUserById repository", async () => {
        await service.getUserById(mockUser.id);
        expect(mockUserRepository.getUserById).toHaveBeenCalledWith(mockUser.id);
    });

    it("updateUser service should call a update repository", async () => {
        await service.updateUser(mockUser.id, mockUser);
        expect(mockUserRepository.update).toHaveBeenCalledWith(mockUser.id, mockUser);
    })
})