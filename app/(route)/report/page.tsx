import ClientPage from "./client_page";
import useragentservice from "@/src/services/useragentservice";


export default async function ReportPage() {
    const data = await useragentservice.getUserAgent("user");
    return(
        <ClientPage userAgents={data} />
    );
}