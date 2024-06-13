import { AppDataSource, UserModelRepository } from "../config/data-source";
import credentialDto from "../dto/CredentialDto";
import { UserDto } from "../dto/UserDto";
import { UserEntity } from "../entities/UserEntity";
import { createCredentialService, validateCredentialService } from "./credentialsSevice";

export default {
  getAllUsersService: async () /* : Promise<UserEntity[] | null> */ => {
    const allUsers = await UserModelRepository.find({ relations: { turnsIds: true } });
    const newAllUsers = allUsers.map((user) => {
      const { id, name, email, birthdate, nDni, turnsIds } = user;
      return { id, name, email, birthdate, nDni };
    });

    return UserModelRepository.find();
  },

  getUserByIdService: async (idParam: number) /* : Promise<UserEntity | null> */ => {
    try {
      const foundUser = await UserModelRepository.findOneOrFail({ where: { id: idParam }, relations: ["turnsIds"] });

      const { id, name, email, birthdate, nDni, turnsIds } = foundUser;
      const sortedTurnsIds = turnsIds.sort((a, b) => b.id - a.id); // Sort in descending order by id

      const newFoundUser = { id, name, email, birthdate, nDni, turnsIds: sortedTurnsIds };

      return newFoundUser;
      // return foundUser;
    } catch (error) {
      throw new Error("user not found getUserByIdService");
    }
  },
  createUserService: async (userObject: UserDto): Promise<UserEntity | undefined> => {
    const { name, username, email, birthdate, nDni, password } = userObject;
    const credentialsID = await createCredentialService({ username, password });

    const newUser = { name, email, birthdate, nDni, credentialsID };

    UserModelRepository.create(newUser);
    const newUserSave = await UserModelRepository.save(newUser);
    return newUserSave;
  },

  loginUserService: async (userObject: credentialDto): Promise<UserEntity | null> => {
    try {
      const { username, password } = userObject;
      const credentialsID = await validateCredentialService({ username, password });
      const foundUser = await UserModelRepository.findOneByOrFail({ id: credentialsID });

      return foundUser;
    } catch (error) {
      throw Error("user not found");
    }
  },

  deleteUserByIdService: async (id: number) => {
    const deletedUser = await UserModelRepository.delete({ id });
    return deletedUser;
  },

  dropSchemaService: async () => {
    await AppDataSource.dropDatabase();
    console.log("Schema dropped successfully.");

    await AppDataSource.synchronize();
    return "Schema recreated successfully.";
  },
};
