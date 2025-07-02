import { network } from './network';

export const fetchAIGeneratedImage = async (prompt: string) => {
  const response = await network.get('/image/prompt', {
    params: { prompt },
    responseType: 'blob', // 返回图片二进制
  });
  return response.data; // 这里就是"响应部分"
}; 