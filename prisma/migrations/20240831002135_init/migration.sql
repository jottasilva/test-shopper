-- CreateTable
CREATE TABLE "Measureuser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_code" TEXT NOT NULL,
    "measure_value" TEXT NOT NULL,
    "measure_type" TEXT,
    "measure_month" TEXT NOT NULL,
    "measure_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Measureuser_customer_code_key" ON "Measureuser"("customer_code");
