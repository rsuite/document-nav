import React, { useState, useEffect } from 'react';
import { Markdown } from 'markdownloader';
import { Table } from 'rsuite';

function scrollIntoView() {
  if (location.hash) {
    try {
      document.querySelector(decodeURIComponent(location.hash)).scrollIntoView();
    } catch (error) {
      console.error(error);
    }
  }
}

const Content = () => {
  const [showDemo, toggleShow] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTimeout(() => toggleShow(true), 1000);
    const getRow = () => {
      let o = {};
      Array(100)
        .fill(0)
        .forEach((v, index) => (o[String(index)] = '--'));
      return o;
    };
    setTimeout(() => {
      setTableData(
        Array(10)
          .fill(0)
          .map(getRow)
      );
    }, 5000);
    // const timer = setInterval(() => setTableData(prev => [...prev, getRow]), 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollIntoView();
  });

  return (
    <div
      style={{
        paddingBottom: 100
      }}
    >
      <Markdown>{require('../md/doc.md')}</Markdown>
      <br />
      <h2>动态更新的 DOM</h2>
      {showDemo && <Markdown>{require('../md/demo.md')}</Markdown>}
      <br />
      <h2>层级二</h2>
      <div>
        <h3>层级三</h3>
        <div>
          <h4>层级四</h4>
        </div>
      </div>
      <h2>通过设置 deep 参数，使复杂的 DOM 树不会影响性能</h2>
      <div style={{ height: 1000 }}>
        <Table
          data={tableData}
          locale={{
            emptyMessage: '请稍等几秒'
          }}
        >
          {Array(100)
            .fill(0)
            .map((column, index) => {
              return (
                <Table.Column key={index}>
                  <Table.HeaderCell>{index}</Table.HeaderCell>
                  <Table.Cell dataKey={String(index)}>{column}</Table.Cell>
                </Table.Column>
              );
            })}
        </Table>
      </div>
    </div>
  );
};

export default Content;
