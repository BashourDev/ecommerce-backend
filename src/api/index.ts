import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { authenticate, ConfigModule } from "@medusajs/medusa";
import { getConfigFile } from "medusa-core-utils";
import { attachStoreRoutes } from "./routes/store";
import { attachAdminRoutes } from "./routes/admin";

export default (rootDirectory: string): Router | Router[] => {
  // Read currently-loaded medusa config
  const { configModule } = getConfigFile<ConfigModule>(
    rootDirectory,
    "medusa-config"
  );
  const { projectConfig } = configModule;

  // Set up our CORS options objects, based on config
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };

  // Set up express router
  const router = Router();

  router.get("/store/top-products", async (req, res) => {
    const topProductsService = req.scope.resolve("topProductsService");
    res.json({
      products: await topProductsService.getTopProducts(),
    });
  });
  router.get("/store/featured-products", async (req, res) => {
    const featuredProductsService = req.scope.resolve(
      "featuredProductsService"
    );
    res.json({
      products: await featuredProductsService.getFeaturedProducts(),
    });
  });
  router.get("/store/new-products", async (req, res) => {
    const newProductsService = req.scope.resolve("newProductsService");
    res.json({
      products: await newProductsService.getNewProducts(),
    });
  });

  // Set up root routes for store and admin endpoints, with appropriate CORS settings
  router.use("/store", cors(storeCorsOptions), bodyParser.json());
  router.use("/admin", cors(adminCorsOptions), bodyParser.json());

  router.post("/admin/products/update-metadata/:id", async (req, res) => {
    const topProductsService = req.scope.resolve("topProductsService");
    res.json({
      products: await topProductsService.updateMetadata(
        req.params.id,
        req.body.metadata
      ),
    });
  });
  router.post("/admin/collections/update-metadata/:id", async (req, res) => {
    const updateCollectionService = req.scope.resolve(
      "updateCollectionsService"
    );
    res.json({
      products: await updateCollectionService.updateMetadata(
        req.params.id,
        req.body.metadata
      ),
    });
  });

  // Add authentication to all admin routes *except* auth and account invite ones
  router.use(/\/admin\/((?!auth)(?!invites).*)/, authenticate());

  // Set up routers for store and admin endpoints
  const storeRouter = Router();
  const adminRouter = Router();

  // Attach these routers to the root routes
  router.use("/store", storeRouter);
  router.use("/admin", adminRouter);

  // Attach custom routes to these routers
  attachStoreRoutes(storeRouter);
  attachAdminRoutes(adminRouter);

  return router;
};
