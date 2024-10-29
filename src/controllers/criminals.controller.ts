import { Request, Response } from "express";
import { prismaConection } from "../database/prisma.connection";

export class CriminalsController {
  public static async create(req: Request, res: Response) {
    try {
      const { cpf, name, birthDate, address } = req.body;

      await prismaConection.criminals.create({
        data: {
          cpf,
          name,
          birthDate,
          address,
        },
      });

      return res
        .status(201)
        .json({ ok: true, message: "Criminal registered successfully!" });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `An unexpected error occurred. Error: ${(err as Error).name}`,
      });
    }
  }

  public static async list(req: Request, res: Response) {
    try {
      let { limit, page } = req.query;

      let defaultLimit = 5;
      let defaultPage = 1;

      if (limit) {
        defaultLimit = Number(limit);
      }

      if (page) {
        defaultPage = Number(page);
      }

      const criminals = await prismaConection.criminals.findMany({
        skip: defaultLimit * (defaultPage - 1),
        take: defaultLimit,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          deleted: false,
        },
      });

      const count = await prismaConection.criminals.count({
        where: {
          deleted: false,
        },
      });

      return res.status(200).json({
        ok: true,
        message: "Criminals listed successfully",
        criminals: criminals,
        pagination: {
          limit: defaultLimit,
          page: defaultPage,
          count: count,
          totalPages: Math.ceil(count / defaultLimit),
        },
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `An unexpected error occurred. Error: ${(err as Error).name}`,
      });
    }
  }

  public static async get(req: Request, res: Response) {
    console.log(req.params);

    try {
      const { cpf } = req.params;

      const foundCriminal = await prismaConection.criminals.findUnique({
        where: {
          cpf,
        },
      });
      console.log(foundCriminal);

      if (!foundCriminal) {
        return res.status(400).json({
          ok: false,
          message: "Criminal not found!",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Criminal found",
        criminal: foundCriminal,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `An unexpected error occurred. Error: ${(err as Error).name}`,
      });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const { name, address } = req.body;

      const updatedCriminal = await prismaConection.criminals.update({
        where: {
          cpf,
          deleted: false,
        },
        data: {
          name,
          address,
        },
      });

      return res.status(200).json({
        ok: true,
        message: "Criminal updated successfully",
        updatedCriminal,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `An unexpected error occurred. Error: ${(err as Error).name}`,
      });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const deletedCriminal = await prismaConection.criminals.update({
        where: {
          cpf,
          deleted: false,
        },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });

      return res.status(200).json({
        ok: true,
        message: "Criminal deleted successfully!",
        deletedCriminal,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `An unexpected error occurred. Error: ${(err as Error).name}`,
      });
    }
  }
}
