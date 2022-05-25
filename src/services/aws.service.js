import axios from 'axios';

const awsService = {
    getCpuUsageData() {
        try {
            const cpuUsageData = "https://run.mocky.io/v3/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f";
            return axios.get(cpuUsageData);
        } catch (err) {
            console.log(err);
        }
    },

    getMemoryUsageData() {
        try {
            const memoryUsageData = "https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811";
            return axios.get(memoryUsageData);
        } catch (err) {
            console.log(err)
        }
    },

    getClusterStatusInfo() {
        try {
            const clusterStatusInfo = "https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72";
            return axios.get(clusterStatusInfo);
        } catch (err) {
            console.log(err);
        }
    }

}

export default awsService;