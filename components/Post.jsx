'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

const Post = (props) => {
    const [showMore, setShowMore] = useState(false);

  return (
    <div className='flex flex-col px-3 py-5 rounded-xl bg-white shadow-xl border hover:shadow-2xl'>
      {props.item.image && 
        <>
          <Link href={`posts/${props.item._id}`}>
            <img className='h-80 w-full object-cover bg-white border border-gray-400 rounded-xl' src={props.item.image} />
          </Link>
          <div className='border border-1 border-gray-300 my-4 mx-auto w-[350px]' />
        </>
      }
      <h1 className='font-medium text-xl text-black my-2'>{props.item.title}</h1>
      <p className='text-sm text-gray-700 my-2 flex-1'>
        {showMore ? props.item.description : `${props.item.description.substring(0, 60)}`}
          <button className="ml-1 btn text-xs text-blue-600" onClick={() => setShowMore(!showMore)}>
           {showMore ? "Show less" : "...Show more"}
          </button>
      </p>
      <div className='flex justify-center items-center p-2'>
        <Link href={`updatepost/${props.item._id}`}>
          <CiEdit size={26} className='text-gray hover:text-blue-700' />
        </Link>
        <button className='ml-4'onClick={()=> props.onDelete(props.item._id)}>
          <CiTrash size={26} className='text-gray hover:text-pink-700' />
        </button>
      </div>
   </div>
  )
}

export default Post