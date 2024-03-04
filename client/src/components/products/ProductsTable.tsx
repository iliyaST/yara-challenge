import { ChangeEvent, useState } from "react";
import CreateProductModal from "./CreateProductModal";
import DeleteModal from "./DeleteModal";
import {
  useGetAllProductsQuery,
  useUpdateProductExportStatusMutation,
  useUpdateWarehouseMutation,
} from "generated/graphql";
import ExportModal, { ExportWarehouseConfirmDataType } from "./ExportModal";

type ProductToExportType = {
  id: number;
  sizePerUnit: number;
  type: ProductItemType;
};

const ProductsTable = () => {
  const [updateProductExportStatus] = useUpdateProductExportStatusMutation();
  const [updateWarehouse] = useUpdateWarehouseMutation();

  const {
    data: productsData,
    loading,
    refetch: refetchAllProducts,
  } = useGetAllProductsQuery({ fetchPolicy: "network-only" });
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [productToExport, setProductToExport] =
    useState<ProductToExportType | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showExportProductModal, setShowExportProductModal] = useState(false);
  const [searchProductsQuery, setSearchProductsQuery] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const onSelectProduct = (productId: number) => {
    if (selectedProductIds.find((id) => id === productId)) {
      setSelectedProductIds((products) =>
        products.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductIds((products) => [...products, productId]);
    }
  };

  const selectAllProducts = () => {
    if (productsData?.products) {
      setSelectedProductIds((products) =>
        products.length === 2 ? [] : productsData?.products.map((x) => x.id)
      );
    }
  };

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement> | undefined) =>
    setSearchProductsQuery(e?.target.value || "");

  // delete modal

  const closeDeleteModal = () => {
    setShowDeleteConfirmModal(false);
    setProductIdToDelete(null);
  };

  const onConfirmDelete = () => {
    setShowDeleteConfirmModal(false);
    setProductIdToDelete(null);
  };

  const onProductDelete = (productId: number) => {
    setShowDeleteConfirmModal(true);
    setProductIdToDelete(productId);
  };

  // create modal

  const onCreate = async () => {
    await refetchAllProducts();
    setShowCreateProductModal(false);
  };

  // export modal

  const onExport = ({ id, sizePerUnit, type }: ProductToExportType) => {
    setProductToExport({ id, sizePerUnit, type });
    setShowExportProductModal(true);
  };

  const onExportModalClose = () => {
    setProductToExport(null);
    setShowExportProductModal(false);
  };

  const onConfirmExport = async (
    exportWarehouseData: ExportWarehouseConfirmDataType
  ) => {
    console.log("product", productToExport);
    console.log("export data", exportWarehouseData);
    let warehouseType = exportWarehouseData.productTypes;

    if (!productToExport) {
      return;
    }

    if (exportWarehouseData.size - productToExport.sizePerUnit < 0) {
      alert("No capacity in warehouse!");
      return;
    }

    if (
      exportWarehouseData.productTypes &&
      exportWarehouseData.productTypes !== productToExport.type
    ) {
      alert("Product is incompatible with other products in this warehouse!");
      return;
    }

    if (!exportWarehouseData.productTypes && productToExport.type) {
      warehouseType = productToExport.type;
    }

    await updateWarehouse({
      variables: {
        warehouseId: exportWarehouseData.id,
        size: exportWarehouseData.size - productToExport.sizePerUnit,
        productTypes: warehouseType!,
      },
    });

    await updateProductExportStatus({
      variables: {
        warehouseId: exportWarehouseData.id,
        productId: productToExport.id,
        exported: true,
      },
    });

    setProductToExport(null);
    setShowExportProductModal(false);
    await refetchAllProducts();
  };

  return (
    <>
      <DeleteModal
        message="Are you sure you want to delete this Product?"
        closeModal={closeDeleteModal}
        isOpen={showDeleteConfirmModal}
        onConfirm={onConfirmDelete}
      />
      <CreateProductModal
        closeModal={() => setShowCreateProductModal(false)}
        isOpen={showCreateProductModal}
        onConfirm={onCreate}
      />
      <ExportModal
        closeModal={onExportModalClose}
        isOpen={showExportProductModal}
        onConfirm={onConfirmExport}
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3 pl-2">
            <div className="relative w-max grow">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-2/5 p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                placeholder="Search..."
                onChange={onSearchQuery}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setShowCreateProductModal(true)}
                  className="px-2 relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                >
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    <div className="hidden sm:block">Create Product</div>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                          checked={selectedProductIds.length == 2}
                          onClick={selectAllProducts}
                          readOnly
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase text-center"
                    >
                      Size Per Unit Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productsData
                    ? productsData.products
                        .filter((product) =>
                          product.name
                            .toLocaleLowerCase()
                            .includes(searchProductsQuery.toLocaleLowerCase())
                        )
                        .map((product) => {
                          return (
                            <ProductItem
                              key={product.id}
                              id={product.id}
                              sizePerUnit={product.sizePerUnit}
                              selected={
                                !!selectedProductIds.find(
                                  (id) => id === product.id
                                )
                              }
                              exported={product.exported}
                              name={product.name}
                              type={product.type as any}
                              selectProduct={onSelectProduct}
                              onDelete={onProductDelete}
                              onExport={onExport}
                            />
                          );
                        })
                    : []}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export type ProductItemType = "hazardous" | "non-hazardous";

const ProductItem = ({
  id,
  name,
  type,
  sizePerUnit,
  selected,
  selectProduct,
  onDelete,
  onExport,
  exported,
}: {
  id: number;
  name: string;
  sizePerUnit: number;
  type: ProductItemType;
  selected: boolean;
  exported: boolean;
  selectProduct: (productId: number) => void;
  onDelete: (productId: number) => void;
  onExport: (product: ProductToExportType) => void;
}) => {
  const onSelect = () => selectProduct(id);

  const onProductDeleteClick = () => onDelete(id);

  const onExportClick = () => onExport({ id, sizePerUnit, type });

  return (
    <tr>
      <td className="py-3 pl-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            onClick={onSelect}
            checked={selected}
            readOnly
          />
          <label htmlFor="checkbox" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {type}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
        {sizePerUnit}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <a
          className="text-red-500 hover:text-red-700"
          href="#"
          onClick={onProductDeleteClick}
        >
          Delete
        </a>
      </td>
      {exported ? (
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a
            className="text-green-500 hover:text-green-700 cursor-not-allowed"
            href="#"
          >
            Export
          </a>
        </td>
      ) : (
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a
            onClick={onExportClick}
            className="text-orange-500 hover:text-green-700"
            href="#"
          >
            Import
          </a>
        </td>
      )}
    </tr>
  );
};

export default ProductsTable;
