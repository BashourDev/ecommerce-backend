import { TransactionBaseService } from "@medusajs/medusa";
import { ProductService, ProductStatus } from "@medusajs/medusa";

class FeaturedProductsService extends TransactionBaseService {
  productService: ProductService;
  constructor(container) {
    super(container);
    this.productService = container.productService;
  }

  async getFeaturedProducts() {
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
      }
    );
    const result = products.filter((product) => {
      let isFeatured =
        product.metadata && product.metadata.featured
          ? product.metadata.featured === "true"
          : false;
      if (isFeatured) {
        return product;
      }
    });
    return result;
  }
}

export default FeaturedProductsService;
