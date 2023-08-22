import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import {
  useAdminCustomPost,
  useAdminCustomQuery,
  useAdminProduct,
} from "medusa-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/shared/button";
import { Container } from "../../components/shared/container";
import TextInput from "../../components/custom/text-input";
import EditIcon from "../../components/shared/icons/edit-icon";
import ProductArabicModal from "../../components/melecules/modal/product-arabic/product-arabic-modal";
import Switch from "../../components/custom/switch";
import useNotification from "../../../hooks/use-notification";

const ProductArabicDetails = (props: WidgetProps) => {
  const { id } = useParams();
  const notification = useNotification();
  const { product, status, error } = useAdminProduct(id || "");
  const [featured, setFeatured] = useState(
    product.metadata?.__featured || "false"
  );
  const { mutate, isLoading } = useAdminCustomPost<any, any>(
    `/products/update-metadata/${product.id}`,
    ["updated-metadata", product.id, "featured"],
    {
      product: true,
    }
  );

  useEffect(() => {
    setFeatured(product.metadata?.__featured || "false");
  }, []);

  const handleFeaturedChange = () => {
    let updatedFeatured = featured === "true" ? "false" : "true";
    setFeatured(updatedFeatured);

    let metata = {
      ...product.metadata,
      __featured: updatedFeatured,
    };

    console.log(metata);

    return mutate(
      {
        metadata: metata,
      },
      {
        onSuccess(data, variables, context) {
          notification(
            "Success",
            updatedFeatured === "true"
              ? "The item is featured now"
              : "The item is not featured anymore",
            "success"
          );
        },
        onError(error, variables, context) {
          notification(
            "Error",
            "Something went wrong, please try again",
            "error"
          );
        },
      }
    );
  };

  return (
    <>
      <Container
        title="Featured Product"
        description="Enable to show in the featured products section"
        Action={() => (
          <Switch
            checked={featured === "true"}
            onCheckedChange={handleFeaturedChange}
          />
        )}
      ></Container>
    </>
  );
};

export const config: WidgetConfig = {
  zone: ["product.details.after"],
};

export default ProductArabicDetails;
