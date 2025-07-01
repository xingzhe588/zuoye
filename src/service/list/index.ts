import { network } from '../network';
import { GetListResponse } from './types';

class ListService {
  async getList() {
    const res = await network.get<GetListResponse>('/list');
    return res.data;
  }
}

export const listService = new ListService();