import React, { useState, useRef, useEffect } from "react";
import style from "@/components/pages/viewer/NovelViewer.module.css";
import EmojiPannel from "@/components/widget/EmojiPannel";
import Config from "@/configs/config.export";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCallback } from "react";

interface NovelViewerProps {
  id: number;
  content: string;
  emojiList?: EmojiList[];
}

interface EmojiList {
  id: number;
  emoji: string;
  count: number;
  checked: boolean;
}
type MutationParams = {
  episodeId: number;
  emoji: number;
  episodeRow: number;
};
// NovelViewer : 전체적인 소설 뷰어의 구조와 상태 관리를 담당
export default function NovelViewer(props: {
  viewerData: string;
  emojiData: any;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [textData, setTextData] = useState<NovelViewerProps[]>([]); // 텍스트 데이터
  const [xNumber, setXNumber] = useState<number>(0); // x 좌표
  const [yNumber, setYNumber] = useState<number>(0); // y 좌표
  const [targetId, setTargetId] = useState<number>(0); // 대상 아이디
  const [cookies] = useCookies(["uuid", "accessToken"]);
  const episodeId = Number(router.asPath.split("/")[2]);
  const queryClient = useQueryClient();
  const [isEmojiPanelVisible, setIsEmojiPanelVisible] = useState(false); // 이모티콘 패널 보이기 여부
  const longPressTimerRef = useRef<number | null>(null); // 롱 프레스 타이머 참조
  const baseUrl = Config().baseUrl;
  const mutation = useMutation(
    (params: MutationParams) =>
      axios.post(`${baseUrl}/utils-service/v1/emoji`, params, {
        headers: {
          uuid: cookies.uuid,
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }),

    {
      onError: (error) => {
        console.log("이모지 더하기 실패:", error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["emojiData", episodeId]);
        console.log("이모지 더하기 성공:", data);
      },
    }
  );

  const emojiDataObj =
    props.emojiData?.reduce((acc: any, cur: any) => {
      acc[cur.id] = cur.emoji;
      return acc;
    }, {}) || {};

  const closeEmojiPanel = () => {
    setIsEmojiPanelVisible(false);
  };
  // 대상 핸들러
  const targetHandler = (
    id: number,
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if ("touches" in event) {
      setXNumber(event.changedTouches[0].clientX);
      setYNumber(event.changedTouches[0].clientY);
    } else {
      setXNumber(event.clientX);
      setYNumber(event.clientY);
    }
  };
  // 이모지 핸들러
  const emojiHandler = (id: number) => {
    handleAddEmoji(id);
    closeEmojiPanel();
  };

  useEffect(() => {
    const res: NovelViewerProps[] = [];
    props.viewerData?.split("</p>").map((item, index) => {
      const text = item.replace("<p>", "");

      const emojiList =
        emojiDataObj[index]?.map((emojiItem: any) => ({
          id: emojiItem.id,
          emoji: emojiItem.emoji,
          checked: emojiItem.checked,
          count: emojiItem.count,
        })) || [];

      res.push({ id: index, content: text, emojiList: emojiList });
    });
    setTextData(res);
  }, [props.emojiData]);

  useEffect(() => {
    const handleScroll = () => {
      closeEmojiPanel();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener("touchmove", touchMoveHandler);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("touchmove", touchMoveHandler);
      }
    };
  }, []);

  // 터치 이동 핸들러
  const touchMoveHandler = (e: TouchEvent | MouseEvent) => {
    if (e && "touches" in e) {
      // TouchEvent인 경우
      if (e.touches && e.touches.length > 0) {
        setXNumber(e.touches[0].clientX);
        setYNumber(e.touches[0].clientY);
      }
    } else {
      // MouseEvent인 경우
      setXNumber(e.clientX);
      setYNumber(e.clientY);
    }
  };
  // 이모지 추가 핸들러
  const handleAddEmoji = (emojiId: number) => {
    setTextData((prevTextData) => {
      return prevTextData.map((item) => {
        if (item.id === targetId && item.emojiList) {
          const updatedEmojiList = item.emojiList.map((emoji) => {
            if (emoji.id === emojiId) {
              if (emoji.checked) {
                return emoji;
              }
              return {
                ...emoji,
                count: emoji.count + 1,
                checked: true,
              };
            } else {
              return {
                ...emoji,
                checked: false,
              };
            }
          });
          return {
            ...item,
            emojiList: updatedEmojiList,
          };
        } else {
          return item;
        }
      });
    });

    mutation.mutate({
      episodeId: episodeId,
      emoji: emojiId,
      episodeRow: targetId,
    });
  };
  const handleLongPressStart = useCallback(
    (
      id: number,
      event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
      longPressTimerRef.current = window.setTimeout(() => {
        setTargetId(id);
        setIsEmojiPanelVisible(true);

        if ("touches" in event) {
          setXNumber(event.changedTouches[0].clientX);
          setYNumber(event.changedTouches[0].clientY);
        } else {
          setXNumber(event.clientX);
          setYNumber(event.clientY);
        }
      }, 400);
    },
    []
  );

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);
  const onHidePanel = () => {
    setIsEmojiPanelVisible(false);
  };

  return (
    <div ref={targetRef}>
      {isEmojiPanelVisible && (
        <EmojiPannel
          xNumber={xNumber}
          yNumber={yNumber}
          emojiHandler={emojiHandler}
          isEmojiPanelVisible={isEmojiPanelVisible}
          onHidePanel={onHidePanel}
        />
      )}
      <ul className={style.novelViewWrap}>
        {props.viewerData.length > 0 &&
          textData.map((item: NovelViewerProps) => (
            <ListView
              key={item.id}
              data={item}
              targetHandler={targetHandler}
              handleLongPressStart={handleLongPressStart}
              handleLongPressEnd={handleLongPressEnd}
            />
          ))}
      </ul>
    </div>
  );
}

// 각각의 소설 부분 및  이모지 동작을 처리하는 역할을 수행
const ListView = (props: {
  data: NovelViewerProps;
  targetHandler: Function;
  handleLongPressStart: Function;
  handleLongPressEnd: Function;
}) => {
  const { data, targetHandler, handleLongPressStart, handleLongPressEnd } =
    props;
  const emojiList = data.emojiList || [];
  const handleLongPress = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!data.content.includes("<br>")) {
      handleLongPressStart(data.id, event);
    }
  };

  const handleRelease = () => {
    if (!data.content.includes("<br>")) {
      handleLongPressEnd();
    }
  };

  const handleAddEmoji = (emojiId: number) => {
    if (!data.content.includes("<br>")) {
      const updatedEmojiList = emojiList.map((emoji) => {
        if (emoji.id === emojiId) {
          return {
            ...emoji,
            count: emoji.count + 1,
          };
        } else {
          return emoji;
        }
      });
      targetHandler(data.id, updatedEmojiList);
    }
  };
  return (
    <>
      <div
        className={style.emojiContainer}
        onTouchStart={handleLongPress}
        onTouchEnd={handleRelease}
        onMouseDown={handleLongPress}
        onMouseUp={handleRelease}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: data.content.replace(/<p>/g, "").replace(/<\/p>/g, ""),
          }}
        />
        {emojiList.map((item: EmojiList) => {
          const matchedEmoji = emojiList.find((emoji) => emoji.id === item.id);
          if (matchedEmoji && matchedEmoji.count > 0) {
            return (
              <span
                key={item.id}
                className={
                  matchedEmoji.checked
                    ? style.emojiItemChecked
                    : style.emojiItem
                }
                onClick={() => handleAddEmoji(item.id)}
              >
                {matchedEmoji.emoji}
                {matchedEmoji.count}
              </span>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};
