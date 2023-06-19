import { useQuery, UseQueryResult, useQueryClient } from "react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { emojiFetch } from "../api/batch-service";
import { episodeDetailFetch } from "../api/novel-service";
import { episodeDetailFetchType } from "@/types/service/novel-service";

import NovelViewer from "@/components/pages/viewer/NovelViewer";
import ViewerTop from "@/components/pages/viewer/ViewerTop";
import ViewerBottom from "@/components/pages/viewer/ViewerBottom";

interface ErrorType extends Error {
  message: string;
}

export default function ViewerPage() {
  const { query } = useRouter();
  const episodeId = Number(query.episodeId);

  useEffect(() => {
    if (query.episodeId) {
      const episodeId = Number(query.episodeId);

      if (!isNaN(episodeId)) {
        initializeEventSource(episodeId);
      } else {
        console.error("Invalid episodeId:", query.episodeId);
      }
    }

    return () => {
      closeEventSource();
    };
  }, [query]);
  const queryClient = useQueryClient();
  const eventSource = useRef<EventSource | null>(null);

  const initializeEventSource = (episodeId: number) => {
    closeEventSource();

    const newEventSource = new EventSource(
      `/novels-service/v1/episodes/getEmitter/${episodeId}`
    );

    newEventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    newEventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      newEventSource.close();
    };

    newEventSource.addEventListener("sse", (event) => {
      const message = event.data;
      const regex =
        /EmojiStatusDto\(episodeId=(\d+), episodeRow=(\d+), emoji=(\d+)\)/;
      const match = message.match(regex);

      if (match) {
        const newEmojiData = {
          episodeId: parseInt(match[1], 10),
          episodeRow: parseInt(match[2], 10),
          emoji: parseInt(match[3], 10),
        };

        const queryData = queryClient.getQueryData<any[]>([
          "emojiData",
          episodeId,
        ]);
        const oldData = Array.isArray(queryData) ? [...queryData] : [];

        const existingDataIndex = oldData.findIndex(
          (item) =>
            item.episodeId === newEmojiData.episodeId &&
            item.episodeRow === newEmojiData.episodeRow
        );

        if (existingDataIndex !== -1) {
          oldData[existingDataIndex] = newEmojiData;
        } else {
          oldData.push(newEmojiData);
        }
        queryClient.setQueryData(["emojiData", episodeId], [...oldData]);
        queryClient.invalidateQueries(["emojiData", episodeId]);
      }
    });

    eventSource.current = newEventSource;
  };

  const closeEventSource = () => {
    if (eventSource.current) {
      eventSource.current.close();
      eventSource.current = null;
    }
  };

  const {
    isLoading,
    isError,
    data,
    error,
  }: UseQueryResult<episodeDetailFetchType> = useQuery(
    ["episodeid", episodeId],
    () => episodeDetailFetch(episodeId),
    {
      onError: (error: ErrorType) => {
        console.log(error.message);
      },
      enabled: !!episodeId,
    }
  );
  const episodeDetailDataResult = data?.data;

  const { data: emojiQuery } = useQuery(
    ["emojiData", episodeId],
    () => emojiFetch(episodeId),
    {
      enabled: !!episodeId,
    }
  );

  return (
    <>
      <Head>
        <title>{`${episodeDetailDataResult?.title} | ReadMe`}</title>
        <meta name="description" content={episodeDetailDataResult?.content} />
      </Head>
      {episodeDetailDataResult && (
        <>
          <ViewerTop
            novelId={episodeDetailDataResult.novelId}
            title={episodeDetailDataResult.title}
            novelsTitle={episodeDetailDataResult.novelsTitle}
            registration={episodeDetailDataResult.registration}
          />
          <NovelViewer
            viewerData={episodeDetailDataResult.content}
            emojiData={emojiQuery.data || []}
          />
          <ViewerBottom
            novelId={episodeDetailDataResult.novelId}
            title={episodeDetailDataResult.title}
            prevId={episodeDetailDataResult.prevId}
            prevFree={episodeDetailDataResult.prevFree}
            prevRead={episodeDetailDataResult.prevRead}
            nextId={episodeDetailDataResult.nextId}
            nextFree={episodeDetailDataResult.nextFree}
            nextRead={episodeDetailDataResult.nextRead}
          />
        </>
      )}
    </>
  );
}
