import './header.css'
import { Layout } from 'antd';
const { Header } = Layout;
const CustomHeader = () => {
    return (
        <Header className="header">
            <img className='logo' src={require('../../assets/logo.png')} alt="JobLister"/>
            <h1 className="title">JobLister</h1>
        </Header>
    )
}
export default CustomHeader;