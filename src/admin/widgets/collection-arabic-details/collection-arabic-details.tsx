import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import {
  useAdminCustomPost,
  useAdminCustomQuery,
  useAdminCollection,
} from "medusa-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/shared/button";
import { Container } from "../../components/shared/container";
import TextInput from "../../components/custom/text-input";
import EditIcon from "../../components/shared/icons/edit-icon";
import CollectionArabicModal from "../../components/melecules/modal/collection-arabic/collection-arabic-modal";

const CollectionArabicDetails = (props: WidgetProps) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { collection, status, error } = useAdminCollection(id || "");

  return (
    <>
      <Container
        title="Collection Arabic Details"
        description="set arabic details for the collection to reach out to more people"
        Action={() => <EditIcon onClick={() => setOpen(true)} />}
      >
        <Detail title="Title" value={collection.metadata?.__arabic_title} />
        {/* <Detail title="Subtitle" value={collection.metadata?.__arabic_subtitle} />
        <Detail
          title="Description"
          value={collection.metadata?.__arabic_description}
        /> */}
        <CollectionArabicModal
          open={open}
          onClose={() => setOpen(false)}
          collection={collection}
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
  zone: ["product_collection.details.after"],
};

export default CollectionArabicDetails;
