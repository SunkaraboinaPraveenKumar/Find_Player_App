import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import {
    getDownloadURL, getStorage,
    ref, uploadBytes
} from "firebase/storage";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { app } from '../shared/FireBase';
import Toast from './Toast'
import Data from '../shared/Data';
import { useRouter } from 'next/router';

function Form() {
    const router = useRouter();
    const [inputs, setInputs] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [file, setFile] = useState(null);
    const [submit, setSubmit] = useState(false);

    const { data: session } = useSession();
    const db = getFirestore(app);
    const storage = getStorage(app);

    useEffect(() => {
        if (session) {
            setInputs((values) => ({ ...values, username: session.user?.name }));
            setInputs((values) => ({ ...values, userImage: session.user?.image }));
            setInputs((values) => ({ ...values, email: session.user?.email }));
        }
    }, [session]);

    useEffect(() => {
        if (router.query.id) {
            loadPostDetails(router.query.id);
        }
    }, [router.query.id]);

    useEffect(() => {
        if (submit) {
            savePost();
        }
    }, [submit]);

    const loadPostDetails = async (id) => {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setInputs(docSnap.data());
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowToast(true);
        if (file) {
            const storageRef = ref(storage, 'find_player/' + file?.name);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setInputs((values) => ({ ...values, image: url }));
        }
        setSubmit(true);
    };

    const savePost = async () => {
        if (router.query.id) {
            // Update existing post
            const docRef = doc(db, "posts", router.query.id);
            await updateDoc(docRef, inputs);
        } else {
            // Create new post
            await setDoc(doc(db, "posts", Date.now().toString()), inputs);
        }
        // Reset the form after saving
        router.push("/");
        resetForm();
    };

    const resetForm = () => {
        setInputs({});
        setFile(null);
    };

    return (
        <div className='mt-4'>
            {showToast ? (
                <div className='absolute top-10 right-10'>
                    <Toast
                        msg={"Post Saved Successfully"}
                        closeToast={() => setShowToast(false)}
                    />
                </div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    required
                    onChange={handleChange}
                    value={inputs.title || ''}
                    className='w-full mb-4 border-[1px] p-2 rounded-md'
                />
                <textarea
                    name='desc'
                    className='w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md'
                    required
                    onChange={handleChange}
                    placeholder='Write Description here'
                    value={inputs.desc || ''}
                />
                <input
                    type="date"
                    name="date"
                    required
                    onChange={handleChange}
                    value={inputs.date || ''}
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type='text'
                    name='location'
                    placeholder='Location'
                    required
                    onChange={handleChange}
                    value={inputs.location || ''}
                    className='w-full mb-4 border-[1px] p-2 rounded-md'
                />
                <input
                    type='text'
                    name='zip'
                    placeholder='Zip'
                    required
                    onChange={handleChange}
                    value={inputs.zip || ''}
                    className='w-full mb-4 border-[1px] p-2 rounded-md'
                />
                <select
                    name='game'
                    onChange={handleChange}
                    value={inputs.game || ''}
                    required
                    className='mb-4 w-full border-[1px] p-2 rounded-md'>
                    <option disabled defaultValue>
                        Select Game
                    </option>
                    {
                        Data.GameList.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
                <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    accept='image/gif,image/jpeg,image/png,image/jpg'
                    className='mb-5 border-[1px] w-full'
                />
                <button type='submit' className='bg-blue-500 w-full p-1 rounded-md text-white'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form
