import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Toast from '../../components/Toast';
import PostItem from '../../components/PostItem';
import { app } from '../../shared/FireBase';
import PostModal from '../../components/PostModal';
import { useRouter } from 'next/router';

function Profile() {
    const [post, setPost] = useState();
    const { data: session } = useSession();
    const [userPost, setUserPost] = useState([]);
    const db = getFirestore(app);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter(); // Next.js router for redirection

    useEffect(() => {
        getUserPost();
    }, [session, showToast]);

    const getUserPost = async () => {
        setUserPost([]);
        if (session?.user?.email) {
            const q = query(collection(db, "posts"),
                where("email", "==", session?.user.email));
            const querySnapShot = await getDocs(q);
            const posts = [];
            querySnapShot.forEach((doc) => {
                let data = doc.data();
                data.id = doc.id;
                posts.push(data);
            });
            setUserPost(posts);
        }
    }

    const onDeletePost = async (id) => {
        await deleteDoc(doc(db, "posts", id));
        setShowToast(true);
    }

    const handleEdit = (post) => {
        // Redirect to create-post page with current post details
        router.push({
            pathname: '/create-post',
            query: { 
                id:post.id,
                title: post.title, 
                desc: post.desc, 
                date: post.date, 
                location: post.location, 
                zip: post.zip, 
                game: post.game, 
                image: post.image 
            }
        });
    }

    return (
        <div className='p-6 mt-8'>
            <PostModal post={post} />
            {
                !session &&
                <h1 className='text-center text-red-600 text-3xl'>Please Login!</h1>
            }
            {
                showToast ? (
                    <div className='absolute top-10 right-10'>
                        <Toast msg={'Post Deleted Successfully'} closeToast={() => setShowToast(false)} />
                    </div>
                ) : null
            }
            <h2 className='text-[35px] font-extrabold text-blue-500'>Profile</h2>
            <p>Manage Your Posts</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10'>
                {
                    userPost && userPost?.map((item, index) => (
                        <div key={index}>
                            <PostItem post={item} modal={true} />
                            <div className='flex gap-2'>
                                <button 
                                    className='bg-blue-400 w-full p-1 mt-1 rounded-md text-white'
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className='bg-red-400 w-full p-1 mt-1 rounded-md text-white'
                                    onClick={() => onDeletePost(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile
