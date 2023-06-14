import { Label, Modal, TextInput, Select } from "flowbite-react";
import type { AddModalBodyType } from "../AddModalBody";

interface UpdateModalBodyType extends AddModalBodyType {
  contract?: {
    debt_serie_id: number;
    oa_id: number;
    customer_id: number;
    contract_no: string;
    financial_institution: string;
    os_balance: number;
  };
}

const UpdateModalBody: React.FC<UpdateModalBodyType> = ({
  debt_series,
  oas,
  customers,
  contract,
}) => {
  const {
    contract_no,
    financial_institution,
    debt_serie_id,
    oa_id,
    os_balance,
    customer_id,
  } = contract || {};
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
              defaultValue={contract_no}
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
              defaultValue={financial_institution}
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
              defaultValue={os_balance}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="debt_serie_id">Debt Serie</Label>
          <div className="mt-1">
            {debt_serie_id && (
              <Select
                id="debt_serie_id"
                name="debt_serie_id"
                defaultValue={debt_serie_id}
              >
                {debt_series?.map((debt_serie) => {
                  const { id, name } = debt_serie;
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
          <Label htmlFor="oa_id">OA</Label>
          <div className="mt-1">
            {oa_id && (
              <Select id="oa_id" name="oa_id" defaultValue={oa_id}>
                {oas?.map((oa) => {
                  const { id, name } = oa;
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
          <Label htmlFor="customer_id">Customer</Label>
          <div className="mt-1">
            {customer_id && (
              <Select
                id="customer_id"
                name="customer_id"
                defaultValue={customer_id}
              >
                {customers?.map((customer) => {
                  const { id, first_name, last_name, national_id } = customer;
                  return (
                    <option key={id} value={id}>
                      {first_name} {last_name} ({national_id})
                    </option>
                  );
                })}
              </Select>
            )}
          </div>
        </div>
      </div>
    </Modal.Body>
  );
};

export default UpdateModalBody;
