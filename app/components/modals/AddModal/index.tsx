import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "@remix-run/react";

type AddModalType = {
  title: string;
  visible: boolean;
  body: React.ReactNode;
};

const AddModal: React.FC<AddModalType> = ({ title, visible, body }) => {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate(-1)} show={visible}>
      <form method="POST">
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{title}</strong>
        </Modal.Header>
        {body}
        <Modal.Footer>
          <Button color="success" type="submit" className="px-1">
            <HiPlus className="mr-1" />
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddModal;
