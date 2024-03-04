import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createWarehouse: Warehouse;
  updateProductExportStatus: UpdateProductResponse;
  updateWarehouse: UpdateWarehouseResponse;
};


export type MutationCreateProductArgs = {
  name: Scalars['String']['input'];
  sizePerUnit: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateWarehouseArgs = {
  name: Scalars['String']['input'];
  size: Scalars['Float']['input'];
};


export type MutationUpdateProductExportStatusArgs = {
  exported: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
  warehouseId: Scalars['Float']['input'];
};


export type MutationUpdateWarehouseArgs = {
  productTypes: Scalars['String']['input'];
  size: Scalars['Float']['input'];
  warehouseId: Scalars['Float']['input'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String']['output'];
  exported: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  sizePerUnit: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  warehouseId?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  warehouses: Array<Warehouse>;
};

export type UpdateProductResponse = {
  __typename?: 'UpdateProductResponse';
  id: Scalars['Float']['output'];
};

export type UpdateWarehouseResponse = {
  __typename?: 'UpdateWarehouseResponse';
  id: Scalars['Float']['output'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  createdAt: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  productTypes?: Maybe<Scalars['String']['output']>;
  size: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateProductMutationVariables = Exact<{
  type: Scalars['String']['input'];
  sizePerUnit: Scalars['Float']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number } };

export type UpdateProductExportStatusMutationVariables = Exact<{
  warehouseId: Scalars['Float']['input'];
  exported: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
}>;


export type UpdateProductExportStatusMutation = { __typename?: 'Mutation', updateProductExportStatus: { __typename?: 'UpdateProductResponse', id: number } };

export type CreateWarehouseMutationVariables = Exact<{
  size: Scalars['Float']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', id: number } };

export type UpdateWarehouseMutationVariables = Exact<{
  size: Scalars['Float']['input'];
  productTypes: Scalars['String']['input'];
  warehouseId: Scalars['Float']['input'];
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse: { __typename?: 'UpdateWarehouseResponse', id: number } };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, createdAt: string, sizePerUnit: number, type: string, exported: boolean }> };

export type GetAllWarehousesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWarehousesQuery = { __typename?: 'Query', warehouses: Array<{ __typename?: 'Warehouse', id: number, name: string, createdAt: string, productTypes?: string | null, size: number }> };


export const CreateProductDocument = gql`
    mutation CreateProduct($type: String!, $sizePerUnit: Float!, $name: String!) {
  createProduct(type: $type, sizePerUnit: $sizePerUnit, name: $name) {
    id
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      type: // value for 'type'
 *      sizePerUnit: // value for 'sizePerUnit'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductExportStatusDocument = gql`
    mutation UpdateProductExportStatus($warehouseId: Float!, $exported: Boolean!, $productId: Float!) {
  updateProductExportStatus(
    warehouseId: $warehouseId
    exported: $exported
    productId: $productId
  ) {
    id
  }
}
    `;
export type UpdateProductExportStatusMutationFn = Apollo.MutationFunction<UpdateProductExportStatusMutation, UpdateProductExportStatusMutationVariables>;

/**
 * __useUpdateProductExportStatusMutation__
 *
 * To run a mutation, you first call `useUpdateProductExportStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductExportStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductExportStatusMutation, { data, loading, error }] = useUpdateProductExportStatusMutation({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      exported: // value for 'exported'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUpdateProductExportStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductExportStatusMutation, UpdateProductExportStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductExportStatusMutation, UpdateProductExportStatusMutationVariables>(UpdateProductExportStatusDocument, options);
      }
export type UpdateProductExportStatusMutationHookResult = ReturnType<typeof useUpdateProductExportStatusMutation>;
export type UpdateProductExportStatusMutationResult = Apollo.MutationResult<UpdateProductExportStatusMutation>;
export type UpdateProductExportStatusMutationOptions = Apollo.BaseMutationOptions<UpdateProductExportStatusMutation, UpdateProductExportStatusMutationVariables>;
export const CreateWarehouseDocument = gql`
    mutation CreateWarehouse($size: Float!, $name: String!) {
  createWarehouse(size: $size, name: $name) {
    id
  }
}
    `;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<CreateWarehouseMutation, CreateWarehouseMutationVariables>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      size: // value for 'size'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, options);
      }
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>;
export type CreateWarehouseMutationResult = Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = gql`
    mutation updateWarehouse($size: Float!, $productTypes: String!, $warehouseId: Float!) {
  updateWarehouse(
    size: $size
    productTypes: $productTypes
    warehouseId: $warehouseId
  ) {
    id
  }
}
    `;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      size: // value for 'size'
 *      productTypes: // value for 'productTypes'
 *      warehouseId: // value for 'warehouseId'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, options);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    id
    name
    createdAt
    sizePerUnit
    type
    exported
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetAllWarehousesDocument = gql`
    query GetAllWarehouses {
  warehouses {
    id
    name
    createdAt
    productTypes
    size
  }
}
    `;

/**
 * __useGetAllWarehousesQuery__
 *
 * To run a query within a React component, call `useGetAllWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWarehousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWarehousesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
      }
export function useGetAllWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export function useGetAllWarehousesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export type GetAllWarehousesQueryHookResult = ReturnType<typeof useGetAllWarehousesQuery>;
export type GetAllWarehousesLazyQueryHookResult = ReturnType<typeof useGetAllWarehousesLazyQuery>;
export type GetAllWarehousesSuspenseQueryHookResult = ReturnType<typeof useGetAllWarehousesSuspenseQuery>;
export type GetAllWarehousesQueryResult = Apollo.QueryResult<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>;