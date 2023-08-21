import { Product } from "@medusajs/medusa";
import React, { useEffect, useState } from "react";
import { useAdminCustomPost } from "medusa-react";
import Button from "../../../shared/button";
import Modal from "../index";
import InputField from "../../../../components/custom/input-field";
import useNotification from "../../../../../hooks/use-notification";

type Props = {
  collection: any;
  open: boolean;
  onClose: () => void;
};

const CollectionArabicModal = ({ collection, open, onClose }: Props) => {
  const notification = useNotification();
  const [updateCollection, setUpdatedCollection] = useState(collection.metadata || {});
  const { mutate, isLoading } = useAdminCustomPost<any, any>(
    `/collections/update-metadata/${collection.id}`,
    ["updated-metadata","collection"],
    
  );

  const handleChange = (field, event) => {
    setUpdatedCollection((old) => ({ ...old, [field]: event.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    return mutate(
      { metadata: updateCollection },
      {
        onSuccess(data, variables, context) {
          notification("Success", "Successfully updated details", "success");
          onClose();
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
              value={updateCollection?.__arabic_title}
              onChange={(e) => handleChange("__arabic_title", e)}
            />
            {/* <InputField
              label="Subtitle"
              placeholder="Enter Arabic Subtitle"
              value={updateCollection?.__arabic_subtitle}
              onChange={(e) => handleChange("__arabic_subtitle", e)}
            />
            <InputField
              label="Description"
              placeholder="Enter Arabic Description"
              value={updateCollection?.__arabic_description}
              onChange={(e) => handleChange("__arabic_description", e)}
            /> */}
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

export default CollectionArabicModal;
