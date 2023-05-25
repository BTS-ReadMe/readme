import React, { useState, useRef, useEffect } from "react";
import style from "@/components/pages/noveldetail/ViewerPage.module.css";
import EmojiPannel from "@/components/widget/EmojiPannel";

interface NovelViewerProps {
  id: number;
  content: string;
  emojiList?: EmojiList[];
}

interface EmojiList {
  id: number;
  emoji: string;
  count: number;
}

export default function NovelViewer(props: { viewerData: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = React.useState<NovelViewerProps[]>([]);
  const [xNumber, setXNumber] = React.useState<number>(0);
  const [yNumber, setYNumber] = React.useState<number>(0);
  const [targetId, setTargetId] = React.useState<number>(0);
  const emojiList = [
    { id: 1, emoji: "😀", count: 0 },
    { id: 2, emoji: "🤣", count: 0 },
    { id: 3, emoji: "😨", count: 0 },
  ];
  const [isEmojiPanelVisible, setIsEmojiPanelVisible] = useState(false);

  const closeEmojiPanel = () => {
    setIsEmojiPanelVisible(false);
  };

  const targetHandler = (
    id: number,
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    console.log("click", id);
    setTargetId(id);
    setIsEmojiPanelVisible(true);

    if ("touches" in event) {
      setXNumber(event.touches[0].clientX);
      setYNumber(event.touches[0].clientY);
    } else {
      setXNumber(event.clientX);
      setYNumber(event.clientY);
    }
  };

  const emojiHandler = (id: number) => {
    console.log("emoji", id);
    handleAddEmoji(id);
    closeEmojiPanel();
  };

  useEffect(() => {
    const res: NovelViewerProps[] = [];
    props.viewerData?.split("</p>").map((item, index) => {
      const text = item.replace("<p>", "");
      res.push({ id: index, content: text, emojiList: emojiList });
    });
    setTextData(res);
  }, []);

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

  const touchMoveHandler = (e: TouchEvent | MouseEvent) => {
    if ("touches" in e) {
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

  const handleAddEmoji = (emojiId: number) => {
    const updatedTextData = textData.map((item) => {
      if (item.id === targetId && item.emojiList) {
        const updatedEmojiList = item.emojiList.map((emoji) => {
          if (emoji.id === emojiId) {
            return {
              ...emoji,
              count: emoji.count + 1,
            };
          } else {
            return emoji;
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
    setTextData(updatedTextData);
  };
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
            <ListView key={item.id} data={item} targetHandler={targetHandler} />
          ))}
      </ul>
    </div>
  );
}

const ListView = (props: {
  data: NovelViewerProps;
  targetHandler: Function;
}) => {
  const [isView, setIsView] = useState(false);
  const emojiList = props.data.emojiList || [];

  const listHandler = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (props.data.content !== "<br>") {
      setIsView(!isView);
      props.targetHandler(props.data.id, event);
    }
  };

  const handleAddEmoji = (emojiId: number) => {
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

    props.targetHandler(props.data.id);
  };

  return (
    <>
      <div
        className={style.emojiContainer}
        onTouchStart={listHandler}
        onMouseDown={listHandler}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: props.data.content
              .replace(/<p>/g, "")
              .replace(/<\/p>/g, ""),
          }}
        />
        {emojiList &&
          emojiList.map(
            (item: EmojiList) =>
              item.count > 0 && (
                <span
                  key={item.id}
                  className={style.emojiItem}
                  onClick={() => handleAddEmoji(item.id)}
                >
                  {item.emoji}
                  {item.count}
                </span>
              )
          )}
      </div>
    </>
  );
};
