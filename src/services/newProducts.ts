import { TransactionBaseService } from "@medusajs/medusa";
import { ProductService, ProductStatus } from "@medusajs/medusa";

class NewProductsService extends TransactionBaseService {
  productService: ProductService;
  constructor(container) {
    super(container);
    this.productService = container.productService;
  }

  async getNewProducts() {
    const products = await this.productService.list(
      {
        status: ProductStatus.PUBLISHED,
      },
      {
        relations: [
          "variants",
          "variants.prices",
          "options",
          "options.values",
          "images",
          "tags",
          "collection",
          "type",
        ],
        order: {
          created_at: "DESC",
        },
        take: 8,
      }
    );

    return products;
  }
}

export default NewProductsService;
