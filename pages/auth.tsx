import React, { useCallback, useState } from 'react'
import Input from '@/components/input'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (session){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return {
        props:{}
    }
}

const auth=()=> {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const[variant, setVariant] = useState('login');
    const router = useRouter();
    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        try{
            await signIn('credentials', {
                email,
                password,
                redirect:false,
                callbackUrl:'/'
            });
            router.push('/profiles');
        }catch(error){
            console.log(error);
        }
    },[email, password, router])

    const register = useCallback(async()=>{
        try{
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            
            login();

        }catch(error){
            console.log(error);
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover">
            <div className='bg-black h-full w-full bg-opacity-45'>
                <nav className='px-12 py-6'>
                    <img src="/images/logo.png" className='h-12'></img>
                </nav>

                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-85 px-20 py-20 self-center mt-2 lg:w-2/5 rounded-xl w-full'>
                        <h2 className='text-white text-5xl mb-8 font-semibold'>
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && (
                                <Input id='name'
                                value={name}
                                label='Name'
                                onChange={(e: any) => setName(e.target.value)}
                                type='text'
                                />
                            )}
                            
                            <Input id='email'
                                value={email}
                                label='Email Address'
                                onChange={(e: any) => setEmail(e.target.value)}
                                type='email'
                            />
                            <Input id='password'
                                value={password}
                                label='Password'
                                onChange={(e: any) => setPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className='bg-red-700 py-3
                                     text-white hover:bg-red-800 transition
                                     rounded-ml w-full mt-10'>
                                        {variant=== 'login' ? 'Login' : 'Sign Up'}
                                     </button>

                        <div className='flex flex-row items-center gap-4 mt-10 justify-center'>
                            <div onClick={()=>signIn('google', {callbackUrl:'/profiles'})} className='bg-white flex w-10 h-10 rounded-full items-center text-center justify-center cursor-pointer'>   
                                <FcGoogle size={35}/>
                            </div>
                            <div onClick={()=>signIn('github', {callbackUrl: '/profiles'})} className='bg-white flex w-10 h-10 rounded-full items-center text-center justify-center cursor-pointer'>   
                                <FaGithub size={35}/>
                            </div>
                        </div>
                        <p className='text-neutral-600 mt-12'>
                            {variant === 'login' ? 'First time using Netflix?' : 
                            'Already registered?'}
                            <span onClick={toggleVariant} 
                            className='text-white ml-2 cursor-pointer hover:underline transition'>
                                {variant === 'login' ? 'Create an account' : 'Login'}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default auth