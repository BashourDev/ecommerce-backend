import { Product } from "@medusajs/medusa";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminCustomPost } from "medusa-react";
import Button from "../../../shared/button";
import Modal from "../index";
import InputField from "../../../../components/custom/input-field";

type Props = {
  product: any;
  open: boolean;
  onClose: () => void;
};

const ProductArabicModal = ({ product, open, onClose }: Props) => {
  const [updatedProduct, setUpdatedProduct] = useState(product.metadata || {});
  const { mutate, isLoading } = useAdminCustomPost<any, any>(
    `/products/update-metadata/${product.id}`,
    ["updated-metadata"],
    {
      product: true,
    }
  );

  const handleChange = (field, event) => {
    setUpdatedProduct((old) => ({ ...old, [field]: event.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    return mutate(
      { metadata: updatedProduct },
      {
        onSuccess(data, variables, context) {
          console.log(data);
        },
        onError(error, variables, context) {
          console.log("lalala", error);
        },
      }
    );
  };

  return (
    <Modal open={open} handleClose={onClose} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onClose}>
          <h1 className="inter-xlarge-semibold m-0">Edit Arabic Information</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <InputField
              label="Title"
              placeholder="Enter Arabic Title"
              value={updatedProduct?.__arabic_title}
              onChange={(e) => handleChange("__arabic_title", e)}
            />
            <InputField
              label="Subtitle"
              placeholder="Enter Arabic Subtitle"
              value={updatedProduct?.__arabic_subtitle}
              onChange={(e) => handleChange("__arabic_subtitle", e)}
            />
            <InputField
              label="Description"
              placeholder="Enter Arabic Description"
              value={updatedProduct?.__arabic_description}
              onChange={(e) => handleChange("__arabic_description", e)}
            />
          </Modal.Content>
          <Modal.Footer>
            <div className="flex gap-x-2 justify-end w-full">
              <Button
                size="small"
                variant="secondary"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="primary"
                type="submit"
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const getDefaultValues = (product: Product) => {
  return {
    general: {
      title: product.title,
      subtitle: product.subtitle,
      material: product.material,
      handle: product.handle!,
      description: product.description || null,
    },
    organize: {
      collection: product.collection
        ? { label: product.collection.title, value: product.collection.id }
        : null,
      type: product.type
        ? { label: product.type.value, value: product.type.id }
        : null,
      tags: product.tags ? product.tags.map((t) => t.value) : null,
    },
    discountable: {
      value: product.discountable,
    },
  };
};

export default ProductArabicModal;
