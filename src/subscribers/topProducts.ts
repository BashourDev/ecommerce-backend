// import { EventBusService } from "@medusajs/medusa";

// class TopProductsSubscriber {
//   eventBusService: EventBusService;
//   topProductsService: any;
//   constructor(container) {
//     this.topProductsService = container.topProductsService;
//     this.eventBusService = container.eventBusService;
//     this.eventBusService.subscribe("order.placed", this.handleTopProducts);
//   }
//   handleTopProducts = async (data) => {
//     this.topProductsService.updateSales(data.id);
//   };
// }
// export default TopProductsSubscriber;

class TopProductsSubscriber {
  topProductsService_: any;
  constructor({ topProductsService, eventBusService }) {
    this.topProductsService_ = topProductsService;
    eventBusService.subscribe("order.placed", this.handleTopProducts);
  }
  handleTopProducts = async (data) => {
    this.topProductsService_.updateSales(data.id);
  };
}
export default TopProductsSubscriber;
