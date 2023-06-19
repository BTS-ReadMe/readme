import { QueryFunctionContext } from 'react-query';
import axios from "@/configs/axiosConfig";

export async function novelcommentFetch(context: QueryFunctionContext<[string, number], number>) {
    const [_key, novelId] = context.queryKey;
    const parsedNovelId = Number(novelId);
    const pageParam = context.pageParam ?? 0;
    const response = await axios.get(
      `/utils-service/v1/comments/novels/${parsedNovelId}?page=${pageParam}`
    );
    return response.data;
  }