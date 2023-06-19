import axios from "@/configs/axiosConfig";
import { useMutation } from "react-query";
import { ViewerPositionData } from "@/types/service/novel-service";
export async function bestNovelIdFetch() {
  const response = await axios.get(`/novels-service/v1/main`);
  return response.data;
}

export async function eventNovelFetch() {
  const response = await axios.get(`/novels-service/v1/main/event`);
  return response.data;
}
//에피소드(뷰어페이지)
export async function episodeDetailFetch(episodeid: number) {
  const response = await axios.get(`/novels-service/v1/episodes/${episodeid}`);
  return response.data;
}

//읽은페이지 기억
export function useSendViewerPositionMutation() {
  const sendViewerPosition = useMutation((data: ViewerPositionData) =>
    axios.patch("novels-service/v1/history", data)
  );

  return sendViewerPosition;
}

//메인 카테고리 메뉴 데이터
export async function novelMenusFetch(){
  const response = await axios.get(`/novels-service/v1/main-category`);
  return response.data;
};