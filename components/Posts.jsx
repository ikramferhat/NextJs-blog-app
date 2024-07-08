'use client'

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const a1 = useRouter()
  const onDelete = async(id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/posts?id=${id}`
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
    try {
      await axios.get("http://localhost:3000/api/posts")
        .then(response => {
          console.log('res',response);
          setPosts(response.data.posts);
        })
        .catch(error => {
          console.log(error);
        });      
    } catch (error) {
        console.log("Error loading posts: ", error);
    }
  };

  const aaa = () => {
    a1.refresh()
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      <div className='flex justify-between items-center border border-gray-400 p-2 rounded-xl'>
        <h1 className='text-xl font-bold capitalize'>home page</h1>
        <button onClick={aaa}>hh</button>
        <Link
          href={'/addpost'}
          className='text-xl font-bold block px-4 py-2 rounded-full duration-300 mx-2 capitalize text-white bg-gray-700 hover:bg-gray-500'
        >
          add post
        </Link>
      </div>
      <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 gap-4 my-[100px]'>
       {posts?.map((item, index) => (
        <Post key={index} item={item} onDelete={onDelete} />
      ))}
      </div>
    </div>
  )
}

export default Posts;