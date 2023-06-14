import { Label, Modal, TextInput, Textarea, Select } from "flowbite-react";

type UpdateModalBodyType = {
  positions: {
    id: number;
    name: string;
  }[];
  customer?: {
    first_name: string;
    last_name: string;
    national_id: string;
    occupation_types_id: number;
    salary: string;
    tel_no: string;
    address_details: string;
  };
};

const UpdateModalBody: React.FC<UpdateModalBodyType> = ({
  positions,
  customer,
}) => {
  const {
    first_name,
    last_name,
    national_id,
    occupation_types_id,
    salary,
    tel_no,
    address_details,
  } = customer || {};

  return (
    <Modal.Body>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="first_name">First name</Label>
          <div className="mt-1">
            <TextInput
              id="first_name"
              name="first_name"
              placeholder="Bonnie"
              defaultValue={first_name}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="last_name">Last name</Label>
          <div className="mt-1">
            <TextInput
              id="last_name"
              name="last_name"
              placeholder="Green"
              defaultValue={last_name}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="national_id">National ID</Label>
          <div className="mt-1">
            <TextInput
              id="national_id"
              name="national_id"
              placeholder="2619032640841"
              defaultValue={national_id}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <div className="mt-1">
            {occupation_types_id && (
              <Select
                id="position"
                name="position"
                defaultValue={occupation_types_id}
              >
                {positions?.map((position) => {
                  const { id, name } = position;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </Select>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="salary">Salary</Label>
          <div className="mt-1">
            <TextInput
              id="salary"
              name="salary"
              placeholder="18000"
              defaultValue={salary}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="tel_no">Tel</Label>
          <div className="mt-1">
            <TextInput
              id="tel_no"
              name="tel_no"
              placeholder="0816124453"
              defaultValue={tel_no}
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Label htmlFor="address_details">Address</Label>
        <div className="mt-1">
          <Textarea
            id="address_details"
            name="address_details"
            placeholder="Columbus Oklahoma 1629"
            defaultValue={address_details}
            rows={3}
            required
          />
        </div>
      </div>
    </Modal.Body>
  );
};

export default UpdateModalBody;
