'use client'

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Post from '@/components/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const a1 = useRouter()
  const onDelete = async(id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      await axios({
        method: 'DELETE',
        url: `https://nextjs-blog14-app.netlify.app/api/posts?id=${id}`
      })
      .then(res => {
        console.log('res dele' ,res);
        const newPosts = posts.filter(po => id !== po._id)
        setPosts(newPosts)
        a1.refresh()
      })
      .catch(err => console.log(err))  
    }
  }

  const getPosts = async () => {
    setLoading(true)
    try {
      await axios.get("https://nextjs-blog14-app.netlify.app/api/posts")
        .then(response => {
          console.log('res',response);
          setPosts(response.data.posts);
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
        });      
    } catch (error) {
        console.log("Error loading posts: ", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true)
		try {
			const response = await fetch('https://nextjs-blog14-app.netlify.app/api/posts', {
				method: 'GET',
			});
			if (response.ok) {
				const { posts } = await response.json();
				setPosts(posts);
        console.log('res', posts);
        setLoading(false)
			}
		} catch (error) {
			console.error(error);
		}
	};

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <div className='flex justify-between items-center border border-gray-400 p-2 rounded-xl'>
        <h1 className='text-xl font-bold capitalize'>home page</h1>
        <Link
          href={'/addpost'}
          className='text-xl font-bold block px-4 py-2 rounded-full duration-300 mx-2 capitalize text-white bg-gray-700 hover:bg-gray-500'
        >
          add post
        </Link>
      </div>
      {loading && 
        <div role="status" className='flex justify-center items-center py-5'>
          <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        }
      <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 gap-4 my-[100px]'>
       {posts?.map((item, index) => (
        <Post key={index} item={item} onDelete={onDelete} />
      ))}
      </div>
    </div>
  )
}

export default Posts;