import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Head from "next/head";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import { novelbyIdFetch } from "../api/sections-service";
export default function NovelDetail() {
  const router = useRouter();
  const novelId = Number(router.query.novelId);

  const { data, error, isLoading } = useQuery(
    ["novelbyIdData", novelId],
    novelbyIdFetch,
    {
      enabled: !!novelId,
    }
  );
  const novelbyIdDataResult = data?.data;

  return (
    <>
      <Head>
        {novelbyIdDataResult && (
          <title>{`${novelbyIdDataResult?.title} | ReadMe`}</title>
        )}
        <meta
          name="description"
          content={`${novelbyIdDataResult?.description}`}
        />
      </Head>
      {novelbyIdDataResult && (
        <>
          <NovelDatailHeader
            title={novelbyIdDataResult.title}
            author={novelbyIdDataResult.author}
            genre={novelbyIdDataResult.genre}
            serializationStatus={novelbyIdDataResult.serializationStatus}
            serializationDays={novelbyIdDataResult.serializationDays}
          />
          <NovelDetailInfo
            views={novelbyIdDataResult.views}
            starRating={novelbyIdDataResult.starRating}
            episodeCount={novelbyIdDataResult.episodeCount}
            thumbnail={novelbyIdDataResult.thumbnail}
          />
          <NovelTages tags={novelbyIdDataResult.tags} />
          <NovelDetailMenu
            novelId={novelbyIdDataResult.novelId}
            description={novelbyIdDataResult.description}
            authorComment={novelbyIdDataResult.authorComment}
          />
          <DetailFooter
            title={novelbyIdDataResult.title}
            description={novelbyIdDataResult.description}
            thumbnail={novelbyIdDataResult.thumbnail}
          />
        </>
      )}
    </>
  );
}
