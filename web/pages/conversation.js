import NavBar from '../components/navbar.js';
import React, { useEffect, useState } from 'react';
import { Skeleton, message, Image, Button } from 'antd';
import axios from 'axios';
import { labels, fixRating, matchHighlighter } from '../utils/utils.js';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star.js';
import { createUrl } from '../utils/urlUtils.js';
import { errorMessage } from '../utils/errorUtils.js';

export default function Conversation() {
    const [isLoading, setIsLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [item, setItem] = useState();
    const [search, setSearch] = useState();

    const fetchUrl = async (url) => {
        await axios.get(url)
            .then((response) => {
                setItem(response.data.response.docs[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                errorMessage('solrError', messageApi);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // Get the query from url
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const selectedContext = urlParams.get('selectedContext');
        const search = urlParams.get('search');

        setSearch(search);
        const defType = 'lucene';
        const fl = encodeURIComponent('*, [child]');
        const q = encodeURIComponent('id:' + id);
        const q_op = 'AND';
        const rows = 100;

        if (!selectedContext || !id) {
            setIsLoading(false);
            return;
        }

        const url = createUrl(selectedContext, defType, fl, q_op, q, rows);
        if (!url) {
            errorMessage('createUrlError', messageApi);
            setIsLoading(false);
            return;
        }

        fetchUrl(url);
    }, []);

    const handleGoBack = () => {
        window.history.back();
    }

    return (
        <>
            <NavBar />
            {!item && !isLoading? (
                <p style={{ marginTop: '10px', color: '#555', textAlign: 'center' }}>
                    Oops! No results found. Head back to the{" "}
                    <a href="/" className="link" style={{ color: '#007bff', textDecoration: 'none' }}>
                        homepage
                    </a>{" "}
                    to start a new search.
                </p>
            ) : (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={handleGoBack} style={{ margin: '10px 0 0 10px' }}>Go Back</Button><p style={{ margin: '10px 0px 0px 20px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Search results for: {search}</p>
                    </div>
                </div>
            )}

            {isLoading && <Skeleton active />}

            {!isLoading && item && (
                <React.Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                        <div style={{ textAlign: 'right', marginRight: '30px' }}>
                            <Image
                                width={300}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                alt="Movie Poster"
                                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>

                        <div style={{ flex: 1, marginLeft: '30px', margin: '20px 0' }}>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{item.movie}</h1>
                            <p><b>Release Year:</b> {item.year}</p>
                            <p><b>Characters involved:</b> {item.characters.join(", ")}</p>
                            <p><b>Genres:</b> {item.genres.join(", ")}</p>
                            <p><b>Duration:</b> {item.runtime} minutes</p>
                            <p><b>Rating:</b> <Rating style={{ marginTop: '5px' }} name="read-only" value={labels[fixRating(item.imdb_rating)]} precision={0.5} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /></p>
                            <p><b>Votes:</b>{item.imdb_votes}</p>

                        </div>
                    </div>
                    <div style={{ textAlign: 'justify', marginLeft: '30px' }}>
                        {item.lines.map((line, index) => (
                            <div key={index} style={{ margin: '10px 0' }}>
                                <p>
                                    <b>{line.character}</b>{": "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: matchHighlighter(line.text, search),
                                        }}
                                    ></span>
                                </p>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </>
    );

}