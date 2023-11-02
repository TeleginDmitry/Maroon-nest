-- CreateTable
CREATE TABLE "RecentlyProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RecentlyProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentlyProduct" ADD CONSTRAINT "RecentlyProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyProduct" ADD CONSTRAINT "RecentlyProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
