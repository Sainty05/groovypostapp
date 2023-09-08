import React, { useEffect, useState } from "react";
import axiosBaseUrl from "../Utils/axiosBaseUrl";
import { useGlobalContext } from "../Utils/Context";
import { toast } from "react-hot-toast";
import { FcLike, FcDislike, FcComments, FcDeleteRow } from "react-icons/fc";

export default function Post() {
  const { posts, postData } = useGlobalContext();
  const [commentDisplay, setCommentDisplay] = useState("hidden");
  const [commentPostId, setCommentPostId] = useState();
  const [comment, setComment] = useState();
  useEffect(() => {
    posts();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const deletePost = (id) => {
    axiosBaseUrl.delete(`/drive/delete-post/${id}`, config).then((res) => {
      posts();
      console.log(res);
    });
  };

  const likeUnlike = (id, type) => {
    const user = {
      id: id,
      type: type,
    };
    axiosBaseUrl.post("/drive/post-like-dislike", user, config).then((res) => {
      posts();
    });
  };

  const addComment = (id) => {
    const commentData = {
      post_id: id,
      comment: comment,
    };

    axiosBaseUrl.post("/drive/add-comment", commentData, config).then((res) => {
      toast.success(res.data.message);
      setCommentDisplay("hidden");
      posts();
    });
  };

  return (
    <div className="posts">
      {postData.map((post, i) => (
        <div key={i} className="flex-grow postsBox">
          <h2 className="text-gray-900 text-md title-font font-medium mb-1">
            {post.user_name}
          </h2>
          <p className="leading-relaxed text-base">{post.description}</p>
          <div className="flex w-1/3">
            {post.likes_count}
            <button onClick={() => likeUnlike(post._id, "like")}>
              <FcLike />
            </button>
            <button onClick={() => likeUnlike(post._id, "dislike")}>
              <FcDislike />
            </button>
            <button
              onClick={() => {
                setCommentPostId(post._id);
                setCommentDisplay(commentDisplay === "" ? "hidden" : "");
              }}
            >
              <FcComments />
            </button>
            <button onClick={() => deletePost(post._id)}>
              <FcDeleteRow />
            </button>
          </div>

          {post._id === commentPostId && (
            <div className={"flex " + commentDisplay}>
              <input
                type="text"
                className="border mt-2"
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => addComment(post._id)}>Comment</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
