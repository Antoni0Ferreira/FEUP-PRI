import styles from '../src/styles/Welcome.module.css';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { DownOutlined, AudioOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Space, Input, Button, notification } from 'antd';
import CheckboxMenu from '../components/checkBoxMenu';
const {Search} = Input;
const Context = React.createContext({
  name: 'Default',
});

export default function Home() {
  const [selectedContext, setSelectedContext] = useState('simple_conversations');
  const [dropdownName, setDropdownName] = useState('Simple Context');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isError, setIsError] = useState(false);
  const [choosenGenres, setChoosenGenres] = useState([]);
  const recognition = useRef(null);
  const history = useRouter();
  const [api, contextHolder] = notification.useNotification();

  // Clear the local storage on page load
  useEffect(() => {
    localStorage.removeItem('search');
    localStorage.removeItem('selectedContext');
    localStorage.removeItem('choosenGenres');
  }, []);

  function handleContextChange(key) {
    setSelectedContext(key);
    setDropdownName(key === 'simple_conversations' ? 'Simple Context' : 'Complex Context');
  };

  const openNotification = (placement) => {
    api.info({
      message: `Error`,
      description: (
        <Context.Consumer>
          {(value) => (
            <span>You need to type or speak in order to search. No mind reader on our side🙄</span>
          )}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const handleSearch = (value, _e, info) => {
    _e.preventDefault();
    if (!value) {
      // Add error handling for empty input
      openNotification('bottomLeft');
      setIsError(true);
      return;
    }
    localStorage.setItem('search', value);
    localStorage.setItem('selectedContext', selectedContext);
    localStorage.setItem('choosenGenres', choosenGenres);
    history.push('/result');
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

  const genres = [
    "action",
    "adventure",
    "music",
    "western",
    "sci-fi",
    "horror",
    "family",
    "adult",
    "crime",
    "fantasy",
    "romance",
    "biography",
    "film-noir",
    "history",
    "comedy",
    "documentary",
    "sport",
    "short",
    "musical",
    "thriller",
    "mystery",
    "drama",
    "animation",
    "war"
  ];

  const onCheckboxChange = selection => {
    setChoosenGenres([...selection]);
  };
  
  const contextValue = useMemo(
    () => ({
      name: 'MovieHut.pt',
    }),
    [],
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>Welcome to MovieHut.pt</h1>
          <p className={styles.description}>The place to find any movie related information!</p>
          <Space direction="vertical">
            <Search
              placeholder="Type or Press to Speak"
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
              status={isError ? 'error' : undefined}
            />
            <div style={{ display: 'flex'}}>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {dropdownName}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <CheckboxMenu options={genres} onChange={onCheckboxChange}/>
            </div>
          </Space>
        </main>
      </div>
    </Context.Provider>
  );
};