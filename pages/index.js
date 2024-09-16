import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../shared/FireBase";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Search from "../components/Search";
import GameList from "../components/GameList";
import Posts from "../components/Posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);

  // Fetch all posts on load
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async (zip = null) => {
    let q = collection(db, "posts");

    if (zip) {
      q = query(q, where("zip", "==", zip));
    }

    const querySnapShot = await getDocs(q);
    const filteredPosts = [];
    querySnapShot.forEach((doc) => {
      filteredPosts.push(doc.data());
    });

    setPosts(filteredPosts);
  };

  const handleSearch = (zip) => {
    getPost(zip);
  };

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9">
      <Hero />
      <Search onSearch={handleSearch} />
      <GameList />
      {posts.length ? <Posts posts={posts} /> : <p>No posts found</p>}
    </div>
  );
}
