import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const getUsers = async (_req: Request, res: Response) => {
   try {
      const result = await userService.getAll();

      res.status(200).json({
         success: true,
         users: result,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createUser = async (req: Request, res: Response) => {
   try {
      const { name, username, email, password } = req.body;
      const emailUsed = await userService.findByEmail(email);
      const usernameUsed = await userService.findByUsername(username);

      if (usernameUsed) {
         res.status(401).json({
            success: false,
            message: "Este usuario ya está en uso",
         });
         return;
      }

      if (emailUsed) {
         res.status(401).json({
            success: false,
            message: "Este correo ya está en uso",
         });
         return;
      }

      const newUser = await userService.create(name, username, email, password);

      res.status(200).json({
         success: true,
         message: `Usuario "${newUser.name}" creado`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const deletedUser = await userService.delete(id);

      res.status(200).json({
         success: true,
         message: `Usuario "${deletedUser.name}" eliminado`,
      });
   } catch (e) {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
