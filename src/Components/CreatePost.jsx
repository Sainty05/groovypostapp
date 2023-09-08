import React, { useState } from "react";
import { useGlobalContext } from "../Utils/Context";
import axiosBaseUrl from "../Utils/axiosBaseUrl";
import { toast } from "react-hot-toast";

export default function CreatePost() {
  let [discription, setDiscription] = useState("");
  const { userId, token, posts } = useGlobalContext();

  const createPost = () => {
    if (discription === "" || userId === "" || token === "") {
      return toast.error("discription required");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const post = {
      drive_id: "64fab057e0e0f77534becf07",
      description: discription,
      user_id: localStorage.getItem("userId"),
    };

    axiosBaseUrl.post("/drive/create-post", post, config).then((res) => {
      if (res.data.success) {
        setDiscription("");
        posts()
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div className="ml-14">
      <textarea
        rows={4}
        cols={50}
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      />
      <button
        className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
        onClick={() => createPost()}
      >
        Post
      </button>
    </div>
  );
}
