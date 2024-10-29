import { cpf as document } from "cpf-cnpj-validator"; 
import { NextFunction, Request, Response } from "express";

export class CreateCriminalMiddleware {
  public static validation(req: Request, res: Response, next: NextFunction) {
    const { cpf, name, birthDate, address } = req.body;

    console.log(!document.isValid(cpf));

    if (!document.isValid(cpf)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid CPF!",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        ok: false,
        message: "Name is invalid!",
      });
    }

    if (!birthDate || birthDate > new Date()) {
      return res.status(400).json({
        ok: false,
        message: "Birth date is invalid!",
      });
    }

    if (!address || typeof address !== "string") {
      return res.status(400).json({
        ok: false,
        message: "Please provide an address!",
      });
    }

    return next();
  }
}
