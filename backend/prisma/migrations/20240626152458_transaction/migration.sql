-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "time_stamp" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
