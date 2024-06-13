import { Request, Response } from "express";
import usersService from "../services/usersService";
import { getAllCredentialsService } from "../services/credentialsSevice";
import catchAsync from "../utils/catchAsync";

const getAllUsersController = async (req: Request, res: Response) => {
  // res.setHeader("token", "autenticado");
  res.json(await usersService.getAllUsersService());

  // res.status(500).json({ message: "error getAllUsersController" });
};

const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundUserId = await usersService.getUserByIdService(Number(id));
  res.status(200).json(foundUserId);

  // res.status(500).json({ message: "error getUserByIdController" });
};

const registerUserController = async (req: Request, res: Response) => {
  // console.log(req.body);
  // return res.json({ backend_register: req.body });

  const { name, username, email, birthdate, nDni, password } = req.body;

  const newUser = await usersService.createUserService({ name, username, email, birthdate, nDni, password });
  res.status(201).json(newUser);

  // res.status(500).json({ message: "error registerUserController" });
};

const loginUserController = async (req: Request, res: Response) => {
  // console.log(req.body);
  // return res.json({ backend_login: req.body });

  const { username, password } = req.body;
  const returnLoginSevice = await usersService.loginUserService({ username, password });
  res.status(200).json({ login: true, user: returnLoginSevice });

  // res.status(500).json({ login: false, message: "error loginUserController" });
};

const deleteUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUserId = await usersService.deleteUserByIdService(Number(id));

  res.status(200).json(deletedUserId);

  res.status(500).json({ message: "error deleteUserByIdController" });
};

// ========== temporal ==========
const getAllCredentialsController = async (req: Request, res: Response) => {
  const credentials = await getAllCredentialsService();
  res.json(credentials);

  res.status(500).json({ message: "error getAllCredentialsController" });
};

const dropSchemaController = async (req: Request, res: Response) => {
  const reset = await usersService.dropSchemaService();
  res.json(reset);

  res.status(500).json({ message: "error resetAllTablesController" });
};
export default {
  getAllUsersController: catchAsync(getAllUsersController),
  getUserByIdController: catchAsync(getUserByIdController),
  registerUserController: catchAsync(registerUserController),
  loginUserController: catchAsync(loginUserController),
  deleteUserByIdController: catchAsync(deleteUserByIdController),
  getAllCredentialsController: catchAsync(getAllCredentialsController),
  dropSchemaController: catchAsync(dropSchemaController),
};
