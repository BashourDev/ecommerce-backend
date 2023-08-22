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

const ProductArabicDetails = (props: WidgetProps) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { product, status, error } = useAdminProduct(id || "");

  return (
    <>
      <Container
        title="Product Arabic Details"
        description="Set arabic details for the product to reach out to more people"
        Action={() => <EditIcon onClick={() => setOpen(true)} />}
      >
        <Detail title="Title" value={product.metadata?.__arabic_title} />
        <Detail title="Subtitle" value={product.metadata?.__arabic_subtitle} />
        <Detail
          title="Description"
          value={product.metadata?.__arabic_description}
        />
        <ProductArabicModal
          open={open}
          onClose={() => setOpen(false)}
          product={product}
        />
      </Container>
    </>
  );
};

const Detail = ({ title, value }: any) => {
  return (
    <div className="flex items-center justify-between inter-base-regular text-grey-50">
      <p>{title}</p>
      <p>{value ? value : "–"}</p>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: ["product.details.after"],
};

export default ProductArabicDetails;
