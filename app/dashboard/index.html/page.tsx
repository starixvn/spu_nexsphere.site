
import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import userDataservice from '@/utils/data-service/user-dataservice'
import ClientPage from "./ClientPage";

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

  const dict = await getDictionary();

  let users = await userDataservice.getUsers();
  let fakeUser = parseInt(users.length) *10;

  return (
      <>
          <ClientPage  list={data} dict={dict} fakeUser={fakeUser}/>

      </>
  )
}

