import styles from '../src/styles/Welcome.module.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { DownOutlined, AudioOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Space, Input } from 'antd';
const { Search } = Input;

export default function Home() {
  const [selectedContext, setSelectedContext] = useState('simple_conversations');
  const [dropdownName, setDropdownName] = useState('Simple Context');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = useRef(null);

  function handleContextChange(key) {
    setSelectedContext(key);
    setDropdownName(key === 'simple_conversations' ? 'Simple Context' : 'Complex Context');
  };

  const fetchUrl = async (url) => {
    await axios.get(url)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleSearch = (value, _e, info) => {
    _e.preventDefault();
    const search = value;
    const url = `http://localhost:8983/solr/${selectedContext}/select?defType=lucene&fl=*%2C%20score%2C%20%5Bchild%5D&indent=true&q.op=AND&q=genres%3Aaction%20transcript%3Akill&rows=100&useParams=`;

    fetchUrl(url);
  };

  const handleSpeechRecognition = () => {
    if (!recognition.current) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        // Update the search input value with the transcribed speech
        const searchInput = document.getElementById('search-input');
        searchInput.value = transcript;
      };
      setIsSpeaking(true);
    }

    recognition.current.start();
  };

  const items = [
    {
      label: 'Simple Context',
      onClick: () => handleContextChange('simple_conversations')
    },
    {
      label: 'Complex Context',
      onClick: () => handleContextChange('complex_conversations')
    },
  ];

  const suffix = ( !isSpeaking ?
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
        cursor: 'pointer',
      }}
      onClick={handleSpeechRecognition}
    />
    : <CloseOutlined
        style={{
          fontSize: 16,
          color: '#1677ff',
          cursor: 'pointer',
        }}
        onClick={() => {
          recognition.current.stop();
          setIsSpeaking(false);
        }}
      />
  );

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Welcome to MovieHut.pt</h1>
        <p className={styles.description}>The place to find any movie related information!</p>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <Space direction="vertical">
            <Search
              id="search-input"
              placeholder="Just wait a little longer 😉"
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={handleSearch}
            />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {dropdownName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </form>
      </main>
    </div>
  );
};