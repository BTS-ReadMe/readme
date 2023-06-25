import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from 'next/head';
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";
import { viewerTypeState } from "@/state/viewerType";
import {
  useQuery,
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "react-query";
import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import Footer from "@/components/layouts/Footer";
import { novelFetch } from "./api/sections-service"
import { novelMenusFetch } from "./api/novel-service";
type ViewerType = "card" | "list";

export default function Novel() {
  const router = useRouter();
  const [viewerType, setViewerType] =
    useRecoilState<ViewerType>(viewerTypeState);

  useEffect(() => {
    setViewerType((router.query.viewerType as ViewerType) || "card");
  }, [router.query.viewerType]);

  const updateViewerType = (type: ViewerType) => {
    setViewerType(type);
    const { category, subCategory } = router.query;
    router.push({
      pathname: router.pathname,
      query: { category, subCategory, viewerType: type },
    });
  };

  const { category, subCategory }: any = router.query;

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const novelMenusQuery = useQuery(["novelMenus"], novelMenusFetch, {
    cacheTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ["novelDatas", category, subCategory],
      ({ pageParam = 0 }) => novelFetch(category, subCategory, pageParam),
      {
        getNextPageParam: (lastPage) => {
          const currentPage = lastPage?.data?.page ?? 0;
          const totalPages = lastPage?.data?.totalPages ?? 0;
          if (currentPage < totalPages) {
            return currentPage + 1;
          }
          return null;
        },
        staleTime: 5 * 1000 * 60,
        cacheTime: 10 * 1000 * 60,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const novelMenusResult = novelMenusQuery?.data?.data;
  const novelDatasResult = data?.pages.flatMap(
    (page) => page.data.novelCardsData
  );
  const totalElementsResult = data?.pages.flatMap(
    (page) => page.data.totalElements
  );

  return (
    <>
      <Head>
        <title>{`웹소설 - ${category} | ReadMe`}</title>
        <meta name="description" content="내가 읽은 싶은 소설이 모여있는 곳!" />
      </Head>
      {novelMenusResult && <AllNovelMenu data={novelMenusResult} />}
      {novelDatasResult && totalElementsResult && (
        <AllNovelCardSection
          data={novelDatasResult}
          totalElements={totalElementsResult[0]}
          viewerType={viewerType}
          setViewerType={updateViewerType}
        />
      )}
      <div ref={ref}></div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, subCategory } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["novelMenus"], novelMenusFetch);
  await queryClient.prefetchQuery(
    ["category", category, "subCategory", subCategory],
    () => novelFetch(String(category), String(subCategory))
  );

  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
  };
};
