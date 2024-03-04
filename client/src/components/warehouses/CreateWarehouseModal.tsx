import { useCreateWarehouseMutation } from "generated/graphql";
import { useState } from "react";

export type CreateModalInputDataType = {
  name?: string;
  size?: number;
};

const CreateWarehouseModal = ({
  isOpen = false,
  onConfirm,
  closeModal,
}: {
  isOpen?: boolean;
  onConfirm: () => void;
  closeModal: () => void;
}) => {
  const [createWarehouse] = useCreateWarehouseMutation();
  const [createModalData, setCreateModalData] =
    useState<CreateModalInputDataType>({});

  const setName = (value: string) =>
    setCreateModalData((oldData) => ({ ...oldData, name: value }));
  const setSize = (value: string) =>
    setCreateModalData((oldData) => ({
      ...oldData,
      size: Number(value),
    }));

  const onConfirmCreate = async () => {
    const warehouseToCreate = {
      name: createModalData.name || "",
      size: createModalData.size || 0,
    };

    const result = await createWarehouse({ variables: warehouseToCreate });

    if (result?.errors) {
      // send notification
      console.log("Something went wrong");
      return;
    }

    onConfirm();
  };

  return (
    <div
      id="create-modal"
      className={`fixed ${
        isOpen ? "" : "hidden"
      } z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
    >
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
        <div className="flex justify-end p-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={closeModal}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <h3 className="text-xl text-center font-normal text-gray-500 mt-5 mb-6">
          Create Warehouse
        </h3>
        <div className="flex flex-col gap-y-5 dir p-6 pt-0">
          <TextInput text="Warehouse name" onChange={setName} />
          <TextInput
            type="number"
            text="Size of Warehouse"
            onChange={setSize}
          />
        </div>
        <div className="flex flex-row justify-center p-6">
          <button
            onClick={onConfirmCreate}
            className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const TextInput = ({
  text,
  type = "text",
  onChange,
}: {
  text: string;
  type?: "text" | "number";
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative w-full min-w-[200px] h-10">
      <input
        type={type}
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
        placeholder=" "
        onChange={(e) => onChange(e.target.value || "")}
      />
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
        {text}
      </label>
    </div>
  );
};

export default CreateWarehouseModal;
