import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import PostModal from './PostModal'

function Posts({ posts }) {
    const [post, setPost] = useState();
    return (
        <div>
            <PostModal post={post} />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10'>
                {posts && posts.length > 0 && posts.map((post, index) => (
                    <div key={index} onClick={() => {
                        document.getElementById('my_modal_1').showModal();
                        setPost(post);
                    }}>
                        <PostItem post={post} modal={true} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Posts