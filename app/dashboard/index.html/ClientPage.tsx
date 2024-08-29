'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';
import MyComponent from '@/components/Dashboard/MyComponent';

// Authority 
import useAuth from '@/utils/hooks/useAuth';





const MainContent = (props) => {
    return (
        <>
            <MyComponent list={props.data}/>
            <Userinfo />
            
        </>
    )

};

export default function ClientPage(props) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    console.log('[Dashboard] useAuth() -> isAuthenticated: ', isAuthenticated);

    useEffect(() => {

        //Authority
        //-----
        if ( !isAuthenticated ) {
            router.push('/sign-in.html');
        }


    }, [isAuthenticated]); 

    return (
        <>
  
            <Layout
                pageTitle="Dashboard"
                contentComponent={<MainContent data={props.list}/>}
            />


        </>
    )
}

