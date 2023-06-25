import axios from "@/configs/axiosConfig";
import { QueryFunctionContext } from "react-query";
/**index */
export async function scheduleTitleFetch() {
  const response = await axios.get(`/sections-service/v1/schedules`);
  return response.data.data;
}

export async function BestNovelItemFetch(bestId: number) {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${bestId}`
  );
  return response.data.data;
}

export async function eventNovelItemFetch(eventId: number) {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${eventId}`
  );
  return response.data.data;
}

export async function mainScheduleFetch({
  queryKey,
}: {
  queryKey: [string, { id: number; name: string }];
}) {
  const [_key, { id }] = queryKey;
  const response = await axios.get(
    `/sections-service/v1/cards/novels/schedules?scheduleId=${id}`
  );
  return response.data.data;
}

/**novelDatail */
export async function novelbyIdFetch(context: QueryFunctionContext<(string | number)[]>) {
  const queryKey = context.queryKey as [string, number];
  const [_, novelId] = queryKey;
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${novelId}`
  );
  return response.data;
}

interface Props{
  pageParam:number
  novelId:number
  sort:string
}

//novel
export async function novelFetch(
  category: string,
  subCategory: string,
  pageParam = 0
){
  const response = await axios.get(
    `/sections-service/v1/cards/novels?pagination=${pageParam}&category=${category}&subCategory=${subCategory}`
  );
  return response.data;
};


interface FetchEpisodesProps {
  pageParam: number;
  queryKey: [string, number, string];
}
/**novelDetail episode */
export async function episodesFetch({ pageParam = 0, queryKey }: FetchEpisodesProps) {
  const [_, novelId, sort] = queryKey;
  const response = await axios.get(
    `/sections-service/v1/cards/episodes/${novelId}?pagination=${pageParam}&sort=${sort}`
  );
  return response.data;
};