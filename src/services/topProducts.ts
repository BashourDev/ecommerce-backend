import { TransactionBaseService } from "@medusajs/medusa";
import { ProductService, ProductStatus, OrderService } from "@medusajs/medusa";

class TopProductsService extends TransactionBaseService {
  productService: ProductService;
  orderService: OrderService;
  constructor(container) {
    super(container);
    this.productService = container.productService;
    this.orderService = container.orderService;
  }

  async getTopProducts() {
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
    products.sort((a, b) => {
      const aSales = a.metadata && a.metadata.sales ? a.metadata.sales : 0;
      const bSales = b.metadata && b.metadata.sales ? b.metadata.sales : 0;
      return aSales > bSales ? -1 : aSales < bSales ? 1 : 0;
    });
    return products.slice(0, 4);
  }

  async updateSales(orderId) {
    const order = await this.orderService.retrieve(orderId, {
      relations: ["items", "items.variant", "items.variant.product"],
    });
    if (order.items && order.items.length) {
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        //retrieve product by id
        const product = await this.productService.retrieve(
          item.variant.product.id,
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
        // upsert the sales
        let updatedMetadata = product.metadata;
        if (!product.metadata || !updatedMetadata.sales) {
          updatedMetadata = { sales: 1 };
        } else {
          updatedMetadata.sales = Number(updatedMetadata.sales) + 1;
        }

        // the old way doesn't take in account that there might be other metadata
        // const sales =
        //   product.metadata && product.metadata.sales
        //     ? product.metadata.sales
        //     : 0;
        //update product
        await this.productService.update(product.id, {
          metadata: { ...updatedMetadata },
        });
      }
    }
  }

  async updateMetadata(productId, newMetadata) {
    return await this.productService.update(productId, {
      metadata: { ...newMetadata },
    });
  }
}

export default TopProductsService;
