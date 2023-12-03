import NavBar from '../components/navbar.js';
import { useEffect, useState } from 'react';
import { Skeleton, message } from 'antd';
import axios from 'axios';

export default function Result() {
    const [response, setResponse] = useState();
    const [responseHeader, setResponseHeader] = useState();
    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const errorMessage = () => {
        messageApi.open({
          type: 'error',
          content: 'There was a problem with the request. Please go back and try again.',
        });
      };

    const fetchUrl = async (url) => {
        await axios.get(url)
          .then((response) => {
            console.log(response.data);
            setResponse(response.data.response);
            setResponseHeader(response.data.responseHeader);
            setIsLoading(false);
        })
          .catch((error) => {
            console.error(error);
            errorMessage();
            setIsLoading(false);
        });
    };

    useEffect(() => {
        //const storedData = JSON.parse(localStorage.getItem('response'));
        const selectedContext = localStorage.getItem('selectedContext');

        if (!selectedContext) {
            setIsLoading(false);
            return;
        }

        const url = `https://api.moviehut.pt/solr/${selectedContext}/select?defType=lucene&fl=*%2C%20score%2C%20%5Bchild%5D&indent=true&q.op=AND&q=genres%3Aaction%20transcript%3Akill&rows=100&useParams=`;

        fetchUrl(url);
    }, []);

    useEffect(() => {
        if (responseHeader) {
            console.log(responseHeader);
            setQuery(responseHeader.params.q);
        }
    }, [responseHeader]);

    return (
        <>
            {contextHolder}
            <div>
                <NavBar/>
                {!response ? (
                    <p>No query. Go back to the <a href="/" className='link'>homepage</a> to search.</p>
                ):(
                    <div>
                        <p>Searching for {query}</p>
                    </div>
                )}
                {isLoading && <Skeleton active />}
            </div>
        </>
    )
}