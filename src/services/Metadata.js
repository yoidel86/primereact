import axios from 'axios';

export class Metadata {
    getMetadata(url){
        return axios.get(url).then(res => res);
    }
}