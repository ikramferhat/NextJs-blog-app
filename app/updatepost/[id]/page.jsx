"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";

export default function EditPost({ params }) {
  const [postImage, setPostImage] = useState('');
  const [postImage1, setPostImage1] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = params;
  const imgRef = useRef();

  const validationSchema = Yup.object({
    newTitle: Yup.string().required("Title is required"),
    newDescription: Yup.string().required("Description is required"),
  });
  
  const formOptions = { resolver: yupResolver(validationSchema),
    defaultValues: async () => {
        const a = await fetch(`http://localhost:3000/api/posts/${id}`);
        const data = await a.json()
        console.log("dd==>",data)
        setPostImage(data.post.image)
        setPostImage1(data.post.image)
      return {
        newTitle: data.post.title,
        newDescription: data.post.description,
        newImage: data.post.image
      }
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  }= useForm(formOptions)

  const cancel = () => {
    router.push('/');
  }

  const onUpdate = async(values) => {
    setLoading(true);
    console.log('DATA===>',values);
    try {
      await axios({
        method: 'PUT',
        url: `http://localhost:3000/api/posts/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(values)
      })
      .then(res => {
        console.log('update',res.data);
        router.push('/');
        setLoading(false);
      })
      .catch(err => 
        console.log(err)
      )  
    } catch (error) {
      console.log(error.dara);
    }
  }

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log('base==>',base64)
    setPostImage(base64)
    setValue('newImage', base64)
  }

  return (
    <div>
      <div className='flex justify-between items-center border border-gray-400 p-2 rounded-xl'>
        <h1 className='text-xl font-bold capitalize'>edit post</h1>
        <Link
          href={'/'}
          className='text-xl font-bold block px-4 py-2 rounded-full duration-300 mx-2 capitalize text-white bg-gray-700 hover:bg-gray-500'
        >
          back to home
        </Link>
      </div>
      <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-2 my-10 py-2 max-w-[800px]">
      {loading && 
        <div role="status">
          <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      }
        <input
          {...register("newTitle")}
          className="rounded-md border px-2 py-4 w-full focus:border-pink-500 outline-none duration-300"
          type="text"
          placeholder="title"
          maxLength={10}
        />
        <p className="text-red-500 text-xs">{errors.newTitle?.message}</p>
        <textarea
          {...register("newDescription")}
          rows={5}
          className="rounded-md border px-2 py-4 w-full focus:border-pink-500 outline-none duration-300"
          placeholder="description"
        />
        <p className="text-red-500 text-xs">{errors.newDescription?.message}</p>
        <label className="text-sm text-gray">Upload image</label>
        <div className="relative">
        <input className="opacity-0 absolute bottom-0 left-0 top-0 right-0"
          name="myFile"
          id="myFile"
          type="file"
          accept='.jpeg, .png, .jpg'
          ref={imgRef}
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        <img className="h-[300px] w-full  rounded-lg object-contain bg-white"
          src={postImage}
        />
        </div>
        <div className="flex justify-start mt-2">
          <button onClick={()=> cancel()} className="text-sm font-bold block px-3 mr-6 py-2 rounded-full duration-300 capitalize text-white bg-pink-700 max-w-xs">
            cancel
          </button>
          <button type="submit" className="text-sm font-bold block px-3 py-2 rounded-full duration-300 capitalize text-white bg-pink-700 max-w-xs">
            update post
          </button>
        </div>   
      </form>
    </div>
  );
}
