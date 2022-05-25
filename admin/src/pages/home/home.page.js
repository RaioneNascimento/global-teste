import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import awsService from '../../services/aws.service';
import { Chart } from "react-google-charts";
import Swal from "sweetalert2";
import './home.page.css';

function HomePage() {
    const [cpuLabel, setCpuLabel] = useState([]);
    const [cpuData, setCpuData] = useState([]);

    const [memoryLabel, setMemoryLabel] = useState([]);
    const [memoryData, setMemoryData] = useState([]);

    const [cluster, setCluster] = useState({});
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        let userData = authService.getLoggedUser();
        if(!userData){
            setRedirectTo("/login")
        } else {
            getCpuUsageData();
            getMemoryUsageData();
            getClusterStatus();
        }
    }, [])

    const getCpuUsageData = useCallback(async () => {
        try {
            let res = await awsService.getCpuUsageData()
            setCpuLabel(res.data.labels);
            setCpuData(res.data.data);
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível buscar CpuUsageData.',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }, [])

    const getMemoryUsageData = useCallback(async () => {
        try {
            let res = await awsService.getMemoryUsageData()
            setMemoryLabel(res.data.labels);
            setMemoryData(res.data.data);
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível buscar MemoryUsageData.',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }, [])

    const getClusterStatus = useCallback(async () => {
        try {
            let res = await awsService.getClusterStatusInfo();
            setCluster(res.data);
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível buscar ClusterStatus.',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }, [])

    var cpuArray = cpuLabel.reduce((result, element, i)=> {
        result.push([element, cpuData[i]]);
      return result
    },[]);
    cpuArray.splice(0, 0, ['Hora', 'Valor'])

    var memoryArray = memoryLabel.reduce((result, element, i)=> {
        result.push([element, memoryData[i]]);
      return result
    },[]);
    memoryArray.splice(0, 0, ['Hora', 'Valor'])

    return (
        <>
            {redirectTo ? <Redirect to={redirectTo}/> : ''}
            <div className="container">
                <PageTop title={"Dashboard"} desc={"Página inicial do sistema."}/>
                <div className="graphic-card">
                    <Chart
                        width={'550px'}
                        height={'350px'}
                        chartType="PieChart"
                        data={cpuArray}
                        options={{title: 'CPU Usage Data'}}
                    />

                    <Chart
                        width={'550px'}
                        height={'350px'}
                        chartType="BarChart"
                        data={memoryArray}
                        options={{title: 'Memory Usage Data'}}
                    />
                </div>
                <div className="bar-cluster-container">
                    <p>Cluster Status: </p>
                    {cluster ? <div className="bar-cluster" style={{ backgroundColor: `${cluster.status}` }}></div> : 'Sem dados do cluster'}
                </div>
            </div>
        </>
    )
}


export default HomePage;