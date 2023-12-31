'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { error } from 'console'
import { toast } from 'react-hot-toast'
import { ifError } from 'assert'

export default function CreatePost() {
    const [title, setTitle] = useState("")  
    const [isDisbled, setIsDisbled] = useState(false)
    let toastPostID: string

    //Create a post
    const { mutate } = useMutation(
        async (title: string ) => await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                if (error instanceof AxiosError){
                    toast.error(error?.response?.data.message, {id: toastPostID})
                }
                setIsDisbled(false)
            },

            onSuccess: (data) => {
                toast.success("Post created successfully 🔥", {id: toastPostID})
                setTitle('')
                setIsDisbled(false)
            }
        }

        
    )
      
    
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        toastPostID = toast.loading("Creating your post...", {id: toastPostID})
        setIsDisbled(true)
        mutate(title)
    }

    return (
    <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
        <div className='flex flex-col my-4'>
            <textarea 
                onChange={(e) => setTitle(e.target.value)} 
                name="title" 
                value={title} 
                placeholder="What's on your mind?"
                className='p-4 text-lg rounded-md my-2 bg-gray-200'>
                </textarea>
        </div>
        <div className='flex items-center justify-between gap-2'>
            <p className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>{`${title.length}/300`}</p>
            <button
            disabled={isDisbled}
            className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
            type='submit'>Create a post</button>
        </div>
    </form>
  )
}