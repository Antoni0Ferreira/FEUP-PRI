import styles from '../src/styles/Welcome.module.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { DownOutlined, AudioOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Space, Input, Button } from 'antd';
const {Search} = Input;

export default function Home() {
  const [selectedContext, setSelectedContext] = useState('simple_conversations');
  const [dropdownName, setDropdownName] = useState('Simple Context');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = useRef(null);

  function handleContextChange(key) {
    setSelectedContext(key);
    setDropdownName(key === 'simple_conversations' ? 'Simple Context' : 'Complex Context');
  };

  const fetchUrl = async (url) => {
    await axios.get(url)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = (value, _e, info) => {
    _e.preventDefault();
    const search = value;
    console.log(search);
    const url = `http://localhost:8983/solr/${selectedContext}/select?defType=lucene&fl=*%2C%20score%2C%20%5Bchild%5D&indent=true&q.op=AND&q=genres%3Aaction%20transcript%3Akill&rows=100&useParams=`;

    fetchUrl(url);
  };

  const handleSpeechRecognition = () => {
    setTranscript('');

    if (!recognition.current) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onaudiostart = () => {
        console.log('RECOGNITION STARTED');
      };

      recognition.current.onaudioend = () => {
        console.log('RECOGNITION FINISHED');
      };

      recognition.current.onend = () => {
        console.log('RECOGNITION DISCONNECTED');
      };

      recognition.current.onspeechstart = () => {
        console.log('SPEECH STARTED');
      };

      recognition.current.onspeechend = () => {
        console.log('SPEECH ENDED');
        handleStopSpeechRecognition();
      };

      recognition.current.onresult = (event) => {
        console.log(event.results);
        setIsSpeaking(false);
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        // Update the search input value with the transcribed speech
        setTranscript(transcript);
      };
    }

    recognition.current.start();
    setIsSpeaking(true);
    console.log('Speech recognition started');
  };

  const handleStopSpeechRecognition = () => {
    setIsSpeaking(false);
    console.log('Speech recognition ended on click');
    recognition.current.stop();
  }

  const handleInputChange = (e) => {
    setTranscript(e.target.value);
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

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Welcome to MovieHut.pt</h1>
        <p className={styles.description}>The place to find any movie related information!</p>
        <Space direction="vertical">
          <Search
            placeholder="Type or Press and Speak"
            enterButton={<Button>Search</Button>}
            size="large"
            value={transcript || undefined}
            suffix={
              !isSpeaking ? (
                <AudioOutlined
                  style={{
                    fontSize: 16,
                    color: '#1677ff',
                    cursor: 'pointer',
                  }}
                  onClick={handleSpeechRecognition}
                />
              ) : (
                <CloseOutlined
                  style={{
                    fontSize: 16,
                    color: '#1677ff',
                    cursor: 'pointer',
                  }}
                  onClick={handleStopSpeechRecognition}
                />
              )
            }
            onSearch={handleSearch}
            onChange={handleInputChange}
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
      </main>
    </div>
  );
};