-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedA" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
