-- CreateEnum
CREATE TYPE "CrimeType" AS ENUM ('Homicide', 'Robbery', 'Trafficking', 'Bribery');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('White', 'Firearm');

-- CreateTable
CREATE TABLE "criminosos" (
    "cpf" VARCHAR(11) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "data_nascimento" TIMESTAMP NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletado_em" TIMESTAMP
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "type" "CrimeType" NOT NULL,
    "data_crime" TIMESTAMP NOT NULL,
    "location" VARCHAR(255) NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "armas" (
    "id" UUID NOT NULL,
    "type" "WeaponType" NOT NULL,
    "caliber" SMALLINT,
    "serialNumber" INTEGER,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "armas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminosos_cpf_key" ON "criminosos"("cpf");
