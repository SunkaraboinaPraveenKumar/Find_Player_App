import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import { HiArrowLeftOnRectangle, HiOutlinePencilSquare } from "react-icons/hi2";
function Header() {
  const router=useRouter();
  const {data:session}=useSession();
  return (
    <div className='flex justify-between p-5 border-b-[2px] border-[#FF3366]'>
        <img onClick={()=>router.push("/")} src='./Images/logo.png' width={150} alt='logo' className='cursor-pointer'/>
        <div className='flex gap-4'>
            <button onClick={()=>router.push('/create-post')} className='bg-black p-2 px-3 text-white rounded-full'>
                <span className='hidden sm:block'>Create Post</span><HiOutlinePencilSquare className='sm:hidden text-[20px]'/>
            </button>
            {!session?<button className='bg-white text-gray-500 p-2 px-3 border-[1px] rounded-full' onClick={()=>signIn()}>
            <span className='hidden sm:block'>Sign In</span><HiArrowLeftOnRectangle className='sm:hidden text-[20px]'/>
            </button>:
            <button className='bg-white text-gray-500 p-2 px-3 border-[1px] rounded-full' onClick={async()=>{
              await signOut();
              router.replace("/")
            }}>
            <span className='hidden sm:block'>Sign Out</span><HiArrowLeftOnRectangle className='sm:hidden text-[20px]'/>
            </button>
            } 
            {
              session?
              <Image src={session?session?.user?.image:'/Images/praveen.jpg'} width={40} height={30} onClick={()=>router.push("/profile")} className='rounded-[100%] cursor-pointer' alt='image'/>
              :null
            }
        </div>
    </div>
  )
}

export default Header