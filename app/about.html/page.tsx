import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'About  abc',
    }
}


export default async function About() {

    return (
        <>
            <ClientPage  />

        </>
    )
}
