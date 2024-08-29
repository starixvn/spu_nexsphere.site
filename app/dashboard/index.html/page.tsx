import axios from "axios";
import { headers } from 'next/headers';
import ClientPage from "./ClientPage";

import apiUrls from '@/config/apiUrls';
import UserDataService from "@/utils/data-service/user-dataservice";
import userDataservice from "@/utils/data-service/user-dataservice";


export async function generateMetadata({ params }) {
    
    return {
        title: 'Dashboard',
    }
}


async function getServerSideProps() {

    

    let data: any = null;
    data = await userDataservice.getUsers();
    
    return data;
}



export default async function Dashboard() {

    const data = await getServerSideProps();

    return (
        <>
            <ClientPage  list={data}/>

        </>
    )
}
