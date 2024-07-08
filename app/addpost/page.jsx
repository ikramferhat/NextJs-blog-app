"use client"

import React from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";

export default function AddPost() {
  const [postImage, setPostImage] = React.useState('');
  const router = useRouter();
  const ref = React.useRef()

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }= useForm(formOptions)

  const onSubmit = async(values) => {
    values.image = postImage;
    console.log('DATA===>',values);
    try {
      axios({
        method: 'POST',
        url: 'https://nextjs-blog14-app.netlify.app/api/posts',
        data: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res);
        router.push('/');
      }
      )
      .catch(err => console.log(err))  
    } catch (error) {
      console.log(error);
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
  }

  return (
    <div>
      <div className='flex justify-between items-center border border-gray-400 p-2 rounded-xl'>
        <h1 className='text-xl font-bold capitalize'>add post</h1>
        <Link
          href={'/'}
          className='text-xl font-bold block px-4 py-2 rounded-full duration-300 mx-2 capitalize text-white bg-gray-700 hover:bg-gray-500'
        >
          back to home
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 my-10 py-2 max-w-[800px]">
        <input
          {...register("title")}
          className="rounded-md border px-2 py-4 w-full focus:border-pink-500 outline-none duration-300"
          type="text"
          placeholder="title"
          maxLength={50}
        />
        <p className="text-red-500 text-xs">{errors.title?.message}</p>
        <textarea
          {...register("description")}
          rows={5}
          className="rounded-md border px-2 py-4 w-full focus:border-pink-500 outline-none duration-300"
          placeholder="description"
        />
        <p className="text-red-500 text-xs">{errors.description?.message}</p>
        <label className="text-sm text-gray">Upload image</label>
        <div className=" relative">
        <input className="opacity-0 absolute bottom-0 left-0 top-0 right-0"
          name="myFile"
          id="myFile"
          type="file"
          accept='.jpeg, .png, .jpg'
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        <img className="h-[300px] w-full
          rounded-lg border border-pink-500 object-contain bg-white"
          src={postImage || '/image3.jpg'}
        />
        </div>
        <div className="flex justify-start">
          <button type="submit" className="text-sm font-bold block px-3 py-2 rounded-full duration-300 capitalize text-white bg-pink-700 max-w-xs">
            add post
          </button>
        </div>    
      </form>
    </div>
  );
}
