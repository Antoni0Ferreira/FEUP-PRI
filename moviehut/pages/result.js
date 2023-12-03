import NavBar from '../components/navbar.js';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import axios from 'axios';

export default function Result() {
    const [response, setResponse] = useState();
    const [responseHeader, setResponseHeader] = useState();
    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUrl = async (url) => {
        await axios.get(url)
          .then((response) => {console.log(response.data); setResponse(response.data.response); setResponseHeader(response.data.responseHeader)})
          .catch((error) => console.error(error));
    };

    useEffect(() => {
        //const storedData = JSON.parse(localStorage.getItem('response'));
        const selectedContext = localStorage.getItem('selectedContext');

        if (!selectedContext) {
            setIsLoading(false);
            return;
        }

        const url = `http://localhost:8983/solr/${selectedContext}/select?defType=lucene&fl=*%2C%20score%2C%20%5Bchild%5D&indent=true&q.op=AND&q=genres%3Aaction%20transcript%3Akill&rows=100&useParams=`;

        fetchUrl(url)
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                // Print error if there is an error
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (responseHeader) {
            console.log(responseHeader);
            setQuery(responseHeader.params.q);
        }
    }, [responseHeader]);

    return (
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
    )
}