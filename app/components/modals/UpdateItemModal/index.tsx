import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from "@remix-run/react";

type UpdateItemModalType = {
  title: string;
  visible: boolean;
  body: React.ReactNode;
};

const UpdateItemModal: React.FC<UpdateItemModalType> = ({
  title,
  visible,
  body,
}) => {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate(-1)} show={visible}>
      <form method="POST">
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{title}</strong>
        </Modal.Header>
        {body}
        <Modal.Footer>
          <Button color="warning" type="submit" className="px-1">
            <HiOutlinePencilAlt className="mr-1" />
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateItemModal;
