import {
  GetAllWarehousesQuery,
  Warehouse,
  useGetAllWarehousesQuery,
} from "generated/graphql";
import { useState } from "react";

export type ExportWarehouseConfirmDataType =
  GetAllWarehousesQuery["warehouses"][0];

const ExportModal = ({
  isOpen = false,
  onConfirm,
  closeModal,
}: {
  isOpen?: boolean;
  onConfirm: (warehouseData: ExportWarehouseConfirmDataType) => void;
  closeModal: () => void;
}) => {
  const [selectedExportWarehouseId, setSelectedExportWarehouseId] = useState<
    number | null
  >(null);
  const { data: warehouseData } = useGetAllWarehousesQuery();

  const onExport = () => {
    const selectedWarehouseData = warehouseData?.warehouses.find(
      (x) => x.id === selectedExportWarehouseId
    );

    if (selectedWarehouseData) {
      onConfirm(selectedWarehouseData);
    }
  };

  return (
    <div
      id="delete-modal"
      className={`fixed ${
        isOpen ? "" : "hidden"
      } z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
    >
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-lg">
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

        <div className="p-6 pt-0 text-center">
          <div className="flex flex-row justify-center ">
            <svg
              fill="#000000"
              height="50px"
              width="50px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 297 297"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M291.219,78.753L153.176,9.732c-2.943-1.473-6.409-1.473-9.353,0L5.781,78.753C2.238,80.525,0,84.145,0,88.107v189.808
		c0,5.775,4.682,10.458,10.458,10.458h34.511c5.775,0,10.458-4.682,10.458-10.458V115.82h186.148v162.095
		c0,5.775,4.682,10.458,10.458,10.458h34.511c5.775,0,10.458-4.682,10.458-10.458V88.107C297,84.145,294.762,80.525,291.219,78.753z
		 M276.085,267.457h-13.595V105.362c0-5.775-4.682-10.458-10.458-10.458H44.968c-5.775,0-10.458,4.682-10.458,10.458v162.095H20.915
		V94.57L148.5,30.778L276.085,94.57V267.457z"
                />
                <path
                  d="M217.521,132.552H148.5c-4.043,0-7.32,3.277-7.32,7.32v61.701H79.479c-4.043,0-7.32,3.277-7.32,7.32v69.021
		c0,4.043,3.277,7.32,7.32,7.32h138.042c4.043,0,7.32-3.277,7.32-7.32V139.873C224.842,135.829,221.564,132.552,217.521,132.552z
		 M155.82,226.568l16.837,16.837l-16.837,16.837V226.568z M141.18,260.241l-16.837-16.837l16.837-16.837V260.241z M166.174,216.214
		h33.673l-16.837,16.837L166.174,216.214z M166.174,201.573l16.837-16.837l16.837,16.837H166.174z M210.201,191.22l-16.836-16.837
		l16.836-16.837V191.22z M183.011,164.03l-16.837-16.837h33.673L183.011,164.03z M172.657,174.383L155.82,191.22v-33.673
		L172.657,174.383z M113.989,233.051l-16.837-16.837h33.673L113.989,233.051z M103.636,243.404l-16.837,16.837v-33.673
		L103.636,243.404z M113.989,253.758l16.837,16.837H97.153L113.989,253.758z M183.01,253.758l16.837,16.837h-33.673L183.01,253.758z
		 M193.364,243.404l16.837-16.837v33.673L193.364,243.404z"
                />
              </g>
            </svg>
          </div>
          <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
            Choose a warehouse to export the product to
          </h3>
          <div className="flex flex-col gap-y-5 overflow-scroll max-h-64">
            {warehouseData?.warehouses.map((x) => {
              return (
                <div
                  key={x.id}
                  onClick={() => setSelectedExportWarehouseId(x.id)}
                  className={`hover:border-orange-200 cursor-pointer p-2 rounded-md ${
                    selectedExportWarehouseId &&
                    selectedExportWarehouseId === x.id
                      ? "border-orange-500 border-2 border-dashed "
                      : "border-2"
                  }`}
                >
                  {x.name}
                </div>
              );
            })}
          </div>
          <div className="flex flex-row justify-center p-6 w-full">
            <button
              onClick={onExport}
              className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
