import Axios from "axios/index";

class DataService {

    get (url) {
        return Axios.get(url);
    }

    getWithPatram(url, data) {
        return Axios.get(url, {
            params: data
        })
    }

    post (url, data){
        return Axios({
            method: 'post',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        });
    }

    delete (url, data){
        return Axios({
            method: 'delete',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        });
    }

    add(url, item) {
        return Axios({
            method: 'post',
            url: url,
            headers: {
                'Accept': 'application/json',
            },
            data: item
        });
    }

    update(url, item) {
        return Axios({
            method: 'put',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: item
        });
    }
}

export default new DataService();