import { Router } from "express";
import { CriminalsController } from "../controllers/criminals.controller";
import { CreateCriminalMiddleware } from "../middlewares/criminal/create.criminal.middleware";

export class CriminalsRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      "/",
      CreateCriminalMiddleware.validation,
      CriminalsController.create
    );
    router.get("/", CriminalsController.list);
    router.get("/:cpf", CriminalsController.get);
    router.put("/:cpf", CriminalsController.update);
    router.delete("/:cpf", CriminalsController.delete);

    return router;
  }
}
