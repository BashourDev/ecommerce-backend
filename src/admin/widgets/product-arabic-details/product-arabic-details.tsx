import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import { useAdminCustomPost, useAdminCustomQuery } from "medusa-react";
import React, { useEffect, useState } from "react";
import Button from "../../components/shared/button";
import { Container } from "../../components/shared/container";
import TextInput from "../../components/custom/text-input";
import EditIcon from "../../components/shared/icons/edit-icon";
import ProductArabicModal from "../../components/melecules/modal/product-arabic/product-arabic-modal";

const ProductArabicDetails = (props: WidgetProps) => {
  let product = {};
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container
        title="Product Arabic Details"
        description="set arabic details for the product to reach out to more people"
        Action={() => <EditIcon onClick={() => setOpen(true)} />}
      >
        <Detail title="Title" value="ddd" />
        <Detail title="Subtitle" value="sss" />
        <Detail title="Describtion" value="aaa" />
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
