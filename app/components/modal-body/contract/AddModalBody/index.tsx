import { Label, Modal, TextInput, Select } from "flowbite-react";

export type AddModalBodyType = {
  debt_series: {
    id: number;
    name: string;
  }[];
  oas: {
    id: number;
    name: string;
  }[];
  customers: {
    id: number;
    first_name: string;
    last_name: string;
    national_id: number;
  }[];
};

const AddModalBody: React.FC<AddModalBodyType> = ({
  debt_series,
  oas,
  customers,
}) => {
  return (
    <Modal.Body>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="contract_no">Contract No</Label>
          <div className="mt-1">
            <TextInput
              id="contract_no"
              name="contract_no"
              placeholder="1985773591145419"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="financial_institution">Financial Institution</Label>
          <div className="mt-1">
            <TextInput
              id="financial_institution"
              name="financial_institution"
              placeholder="AEON"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="os_balance">OS Balance</Label>
          <div className="mt-1">
            <TextInput
              id="os_balance"
              name="os_balance"
              placeholder="15000"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="debt_serie_id">Debt Serie</Label>
          <div className="mt-1">
            <Select id="debt_serie_id" name="debt_serie_id">
              {debt_series?.map((debt_serie) => {
                const { id, name } = debt_serie;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="oa_id">OA</Label>
          <div className="mt-1">
            <Select id="oa_id" name="oa_id">
              {oas?.map((oa) => {
                const { id, name } = oa;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="customer_id">Customer</Label>
          <div className="mt-1">
            <Select id="customer_id" name="customer_id">
              {customers?.map((customer) => {
                const { id, first_name, last_name, national_id } = customer;
                return (
                  <option key={id} value={id}>
                    {first_name} {last_name} ({national_id})
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
    </Modal.Body>
  );
};

export default AddModalBody;
