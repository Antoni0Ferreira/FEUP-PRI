import Link from 'next/link';
import styles from '../src/styles/Welcome.module.css';
import { useState } from 'react';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { event } from 'jquery';

export default function Home() {
  const [selectedContext, setSelectedContext] = useState('simple_conversations');
  const [dropdownName, setDropdownName] = useState('Choose Context');

  const handleContextChange = (event) => {
    setSelectedContext(event.target.value);
    console.log(event.target.options[event.target.selectedIndex].text)
    setDropdownName(event.target.options[event.target.selectedIndex].text);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const search = document.getElementById('search').value;
    const url = `http://localhost:8983/solr/${selectedContext}/select?defType=lucene&fl=*%2C%20score%2C%20%5Bchild%5D&indent=true&q.op=AND&q=genres%3Aaction%20transcript%3Akill&rows=100&useParams=`;

    axios.get(url)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const items = [
    {
      label: 'Simple Context',
      value: 'simple_conversations'
    },
    {
      label: 'Complex Context',
      value: 'complex_conversations'
    },
  ];

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Welcome to MovieHut.pt</h1>
        <p className={styles.description}>The place to find any movie related information!</p>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input type="text" id="search" name="search" placeholder="Just wait a little longer 😉" className={styles.input} />
          <Dropdown menu={{ items }} onChange={handleContextChange}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {dropdownName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </main>
    </div>
  );
};