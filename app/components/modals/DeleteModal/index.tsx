import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "@remix-run/react";

type DeleteModalType = {
  visible: boolean;
};

const DeleteModal: React.FC<DeleteModalType> = ({ visible }) => {
  const navigate = useNavigate();
  return (
    <Modal show={visible} size="md" onClose={() => navigate(-1)}>
      <Modal.Header className="px-6 pb-0 pt-6">
        <span className="sr-only">Delete</span>
      </Modal.Header>
      <Modal.Body className="px-6 pb-6 pt-0">
        <div className="flex flex-col items-center gap-y-6 text-center">
          <HiOutlineExclamationCircle className="text-7xl text-red-500" />
          <p className="text-base text-gray-500">
            Are you sure you want to delete
          </p>
          <form method="POST" className="flex items-center gap-x-3">
            <Button color="failure" type="submit">
              Yes, I'm sure
            </Button>
            <Link to="#">
              <Button color="gray">No, cancel</Button>
            </Link>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
