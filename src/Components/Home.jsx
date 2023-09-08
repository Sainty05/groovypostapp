import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Home() {

  return (
    <div className="postBox">
      <CreatePost />
      <Post />
    </div>
  );
}
