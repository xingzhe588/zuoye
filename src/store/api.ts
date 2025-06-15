// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, QueryReturnValue } from '@reduxjs/toolkit/query/react';
import { GetListResponse } from '../service/list/types';
import { listService } from '../service/list';

const createQueryFromPromise =
  <ARGS, RES>(fn: (...args: Array<ARGS>) => Promise<RES>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (...args): Promise<QueryReturnValue<RES, any, any>> => {
    try {
      const data = await fn(...args);
      return { data };
    } catch (e: unknown) {
      return { error: e };
    }
  };

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getList: builder.query<GetListResponse, undefined>({
      queryFn: createQueryFromPromise(() => listService.getList())
    })
  })
});

export const { useGetListQuery } = api;