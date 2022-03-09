import './App.css';
import { Layout } from 'antd';
import React, { Suspense } from 'react';
import Loader from './components/Loader/Loader';

const JobList = React.lazy(() => import('./components/JobList/JobList'));
const CustomHeader = React.lazy(() => import('./components/Header/CustomHeader'));
const CustomFooter = React.lazy(() => import('./components/Footer/CustomFooter'));
const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Suspense fallback={<div className="suspense-loader"><Loader message="Loading..." /></div>}>
          <CustomHeader />
          <Content >
            <JobList />
          </Content>
          <CustomFooter />
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
