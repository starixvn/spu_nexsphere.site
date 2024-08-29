import axios from 'axios';
import apiUrls from '@/config/apiUrls';
import appData from "@/data/app.json";

const actionCreators = async () => {

    //const res = await axios.get(apiUrls.MENU);

    const action = {
        type: 'RECEIVE_DEMO_MENU',
        payload: appData.menu
    }

    return action;
}

export default actionCreators;

