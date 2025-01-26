'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const { id } = params; 
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/users/${id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`/api/users/${id}/posts`);
        if (!postsResponse.ok) throw new Error('Failed to fetch user posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error:', error.message);
        router.push('/');
      }
    };

    if (id) fetchUserData();
  }, [id, router]);

  if (!user) return <p className='flex items-center justify-center text-2xl'>Loading profile...</p>;

  return (
    <Profile
      name={user.username}
      desc={`Welcome to ${user.username}'s profile page! Explore their creative prompts and ideas.`}
      data={posts}
      handleEdit={null} 
      handleDelete={null} 
    />
  );
};

export default UserProfile;
