import NavBar from '../components/navbar.js';
import { useEffect, useState } from 'react';
import { Skeleton, message, Image } from 'antd';
import axios from 'axios';

export default function Conversation() {
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [doc, setDoc] = useState();


    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'There was a problem with the request. Please go back and try again.',
        });
    };

    const fetchUrl = async (url) => {
        await axios.get(url)
            .then((response) => {
                console.log(response.data.response.docs[0]);
                setResponse(response.data.response);
                setDoc(response.data.response.docs[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                errorMessage();
                setIsLoading(false);
            });
    };
    
    useEffect(() => {
        // Get the query from url
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const selectedContext = urlParams.get('selectedContext');
    
        const defType = 'lucene';
        const fl = encodeURIComponent('*, [child]');
        const q = encodeURIComponent('id:' + id);
        const q_op = 'AND';
        const rows = 100;
    
        if (!selectedContext || !id) {
            setIsLoading(false);
            return;
        }
    
        const url = `https://api.moviehut.pt/solr/${selectedContext}/select?defType=${defType}&fl=${fl}&indent=true&q.op=${q_op}&q=${q}&rows=${rows}&useParams=`;
    
        fetchUrl(url);
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Conversation</h1>
                        <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}