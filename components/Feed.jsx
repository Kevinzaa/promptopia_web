'use client';

import { useEffect, useState } from 'react';
import Promptcard from './Promptcard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <Promptcard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = posts.filter((post) => {
      const searchTerm = value.toLowerCase();
      return (
        post.creator.username.toLowerCase().includes(searchTerm) ||
        post.prompt.toLowerCase().includes(searchTerm) ||
        post.tag.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredPosts(filtered);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const filtered = posts.filter((post) => post.tag.toLowerCase() === tag.toLowerCase());
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        console.log('Fetched Posts:', data);

        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed;
