import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loader.css'

interface Props{
    message:string
}
const Loader =(props:Props)=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return(
        <div className='loader'>
            <Spin indicator={antIcon} />
            <div style={{marginLeft:5}}>
            {props.message}
            </div>
            
        </div>
    )
}
export default Loader;