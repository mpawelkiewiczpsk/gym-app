import React, {useEffect, useState} from 'react';
import {getProtectedInfo, getUserInfo} from '../../api';

const Home: React.FC = () => {

    const [data, setData] = useState('');
    const [data2, setData2] = useState('');


    const getDataFromServer = () => {
        getProtectedInfo().then(data => {
            setData(data?.message ? data?.message : data)

        })

        getUserInfo().then(data => {
            setData2(data?.message ? data?.message : data)

        })
    }

    useEffect(() => {
        getDataFromServer();
    }, []);


    return (
        <>
            <p>{data}</p>
            <p>{data2}</p>
        </>
    );
};

export default Home;
