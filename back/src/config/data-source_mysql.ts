import { DataSource } from "typeorm";
import { CredentialEntity } from "../entities/CredentialEntity";
import { TurnEntity } from "../entities/TurnEntity";
import { UserEntity } from "../entities/UserEntity";

export const AppDataSource = new DataSource({
  type: "mysql", // Change the database type to MySQL
  host: "localhost",
  port: 3306, // MySQL default port is 3306
  username: "root", // Change to your MySQL username
  password: "", // Change to your MySQL password
  database: "soyhenry_db",
  synchronize: true,
  logging: ["error"], // Logging only errors
  entities: [CredentialEntity, TurnEntity, UserEntity],
  subscribers: [],
  migrations: [],
  dropSchema: true, // reset database

});

export const CredentialModelRepository = AppDataSource.getRepository(CredentialEntity);
export const TurnModelRepository = AppDataSource.getRepository(TurnEntity);
export const UserModelRepository = AppDataSource.getRepository(UserEntity);
