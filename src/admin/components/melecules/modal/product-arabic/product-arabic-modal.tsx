import { Product } from "@medusajs/medusa";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/button";
import Modal from "../index";
import InputField from "../../../../components/custom/input-field";

type Props = {
  product: any;
  open: boolean;
  onClose: () => void;
};

const ProductArabicModal = ({ product, open, onClose }: Props) => {
  const onSubmit = () => {};

  return (
    <Modal open={open} handleClose={onClose} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onClose}>
          <h1 className="inter-xlarge-semibold m-0">Edit Arabic Information</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <InputField label="Title" placeholder="Winter Jacket" required />
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
                loading={false}
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
