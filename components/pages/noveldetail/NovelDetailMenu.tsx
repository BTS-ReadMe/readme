import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import EpisodeInfo from "./EpisodeInfo";
import CommentList from "./CommentList";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { episodesFetch } from "@/pages/api/sections-service";

export const SORT_TYPES = {
  RECENT: "최신순",
  FROM_FIRST: "1화부터",
} as const;

const MENULIST = [
  { id: 0, menu: "작품소개" },
  { id: 1, menu: "에피소드" },
  { id: 2, menu: "댓글" },
];

export type SortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];

export default function NovelDetailMenu(props: {
  novelId: number;
  description: string;
  authorComment: string;
}) {
  const [sort, setSort] = useState<SortType>(SORT_TYPES.RECENT);
  const [menuTitle, setMenuTitle] = useState<string>(MENULIST[0].menu);
  const handleSort = (newSort: SortType) => {
    setSort(newSort);
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ["episodes", props.novelId, sort],
      ({ pageParam = 0, queryKey }) =>
        episodesFetch({
          pageParam,
          queryKey: queryKey as [string, number, string],
        }),
      {
        getNextPageParam: (lastPage) => {
          const currentPage = lastPage?.data?.page ?? 0;
          const totalPages = lastPage?.data?.totalPages ?? 0;
          if (currentPage < totalPages) {
            return currentPage + 1;
          }
          return null;
        },
        keepPreviousData: true,
      }
    );

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!isSticky && window.pageYOffset > 570) {
        setIsSticky(true);
      } else if (isSticky && window.pageYOffset <= 570) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [isSticky]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`${style.menutitle} ${isSticky ? style.sticky : ""}`}>
        {MENULIST.map((item) => (
          <p
            key={item.id}
            onClick={() => {
              setMenuTitle(item.menu);
            }}
            className={`${menuTitle === item.menu ? style.menuactive : ""}`}
          >
            {item.menu}
          </p>
        ))}
      </div>
      <div style={{ display: menuTitle === "작품소개" ? "block" : "none" }}>
        <div className={style.infoCentainer}>
          <div className={style.detailTitle}>시놉시스</div>
          <div className={style.authorinfo}>{props.description}</div>
          <LineSeparator colorline="grayline" />
          <div className={style.detailTitle}>작가의 한마디</div>
          <div className={style.authorinfo}>{props.authorComment}</div>
        </div>
      </div>
      <div style={{ display: menuTitle === "에피소드" ? "block" : "none" }}>
        {props.novelId && data && (
          <>
            <EpisodeInfo
              sort={sort}
              onSortChange={handleSort}
              episodes={data.pages.flatMap(
                (page) =>
                  page.data.episodes?.filter(
                    (episode: any) => episode !== undefined && episode !== null
                  ) || []
              )}
            />
            <div className={style.refcheck} ref={ref}></div>
          </>
        )}
      </div>
      <div style={{ display: menuTitle === "댓글" ? "block" : "none" }}>
        <div className={style.infoCentainer}>
          <CommentList />
        </div>
      </div>
    </>
  );
}
