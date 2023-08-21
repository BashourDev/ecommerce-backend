import { TransactionBaseService } from "@medusajs/medusa";
import { ProductCollectionService } from "@medusajs/medusa";

class UpdateCollectionsService extends TransactionBaseService {
  productCollectionService: ProductCollectionService;
  constructor(container) {
    super(container);
    this.productCollectionService = container.productCollectionService;
  }

  async updateMetadata(collectionId, newMetadata) {
    return await this.productCollectionService.update(collectionId, {
      metadata: { ...newMetadata },
    });
  }
}

export default UpdateCollectionsService;
