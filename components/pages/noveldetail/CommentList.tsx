import React, { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import axios from "@/configs/axiosConfig";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Comment from "@/components/ui/Comment";
import style from "@/components/pages/noveldetail/CommentList.module.css";
import CommentsCheck from "./CommentsCheck";
import { novelcommentFetch } from "@/pages/api/utils-service";
interface CommentType {
  id: number;
  writer: string;
  content: string;
  episodesId: number;
  uuid: string;
  novelsId: number;
  myComment: boolean;
  createDate: string;
  recent: boolean;
  episodeTitle: string;
}

export default function CommentList() {
  const router = useRouter();
  const novelId  = Number(router.query.novelId);
  const [cookies] = useCookies(["uuid"]);
  const queryClient = useQueryClient();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  useInfiniteQuery(["comments", novelId], novelcommentFetch, {
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.pagination?.page ?? 0;
      const totalPages = lastPage?.data?.pagination?.totalPage ?? 0;
      if (currentPage < totalPages - 1) {
        return currentPage + 1;
      }
      return null;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const novelcommentData = data?.pages.flatMap((page) => page.data.contents);
  const novelCommentLength = data?.pages[0]?.data?.pagination?.totalElements;

  const deleteCommentMutation = useMutation(
    (commentId: number) =>
      axios.delete(`/utils-service/v1/comments/${commentId}`, {
        headers: {
          uuid: cookies.uuid,
        },
      }),
    {
      onSuccess: () => {
        console.log("댓글이 성공적으로 삭제되었습니다!");
        queryClient.invalidateQueries(["comments", novelId]);
      },
      onError: (error) => {
        console.error(error);
        Swal.fire({
          icon: "warning",
          text: "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    }
  );

  const handleDeleteComment = async (commentId: number) => {
    try {
      const result = await Swal.fire({
        icon: "info",
        text: "댓글을 삭제하시겠습니까?",
        cancelButtonText: "취소",
        showCancelButton: true,
        customClass: {
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button",
        },
      });
      if (result.isConfirmed) {
        await deleteCommentMutation.mutateAsync(commentId);
      }
    } catch (error) {
      console.log(
        "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
        error
      );
    }
  };
  return (
    <div className={style.CommentContainer}>
      <CommentsCheck commentcount={novelCommentLength} />
      {novelcommentData &&
        novelcommentData.map((comment: CommentType) => (
          <Comment
            key={comment.id}
            {...comment}
            onDelete={handleDeleteComment}
          />
        ))}
      <div className={style.refcheck} ref={ref}></div>
    </div>
  );
}
