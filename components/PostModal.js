import React from 'react'
import PostItem from './PostItem'
import { HiOutlineXCircle } from 'react-icons/hi2'

function PostModal({post}) {
    return (
        <div>
            <dialog id="my_modal_1" className="modal p-0 rounded-lg">
                <form method="dialog" className='modal-box'>
                    <button className='absolute right-2 top-2'>
                        <HiOutlineXCircle className='text-[22px] text-gray-700'/>
                    </button>
                    <PostItem post={post}/>
                </form>
            </dialog>
        </div>
    )
}

export default PostModal