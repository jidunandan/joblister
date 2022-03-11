import './joblist.css'
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Select } from 'antd';
import { Row, Col } from 'antd'
const { Option } = Select;
interface Props {
    searchTerm: string,
    setSearchTerm: Function,
    filterCompany: any,
    setFilterCompany: Function,
    companyList: Array<any>,
    clearFilter: Function,
    handleSearch: Function,
    categories: Array<any>,
    categoryFilter: Array<any>,
    setCategoryFilter: Function
}
const SearchandFilter = (props: Props) => {
    const { searchTerm, setSearchTerm, filterCompany,
        setFilterCompany, companyList, clearFilter,
        handleSearch, categories, categoryFilter,
        setCategoryFilter } = props;
    return (
        <div>
            <div className="search-text">
                Search for jobs
            </div>
            <div className="form-container">
            <Row className='search-form-row'>
                <Col span={24}>
                    <Input
                        id="searchBox"
                        allowClear
                        className="search-field"
                        type="text"
                        placeholder='Enter job title or description'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
            </Row>
            <div className="filters-text">
                Filters
            </div>
            <Row className='search-form-row'>
                <Col span={12}>
                    <Select
                        id="filterCompany"
                        className="filter-company"
                        showSearch
                        placeholder="Filter by company"
                        allowClear
                        onChange={(value) => { setFilterCompany(value) }}
                        value={filterCompany} >
                        {companyList.map((item: any, index: any) => {
                            return <Option key={index} value={item}>{item}</Option>
                        })}
                    </Select>
                </Col>
                
                <Select
                    
                    allowClear
                    className='filter-category'
                    placeholder="Filter by category"
                    onChange={(value) => { setCategoryFilter(value) }}
                    value={categoryFilter}
                    maxTagCount='responsive'
                >
                    {categories.map((item: any, index: any) => {
                        return <Option key={index} value={item}>{item}</Option>
                    })}
                </Select>
            </Row>
            <Row className='search-form-row'>
            <Col span={12}>
                    <Button
                        type="link"
                        className='link-button'
                        onClick={() => clearFilter(false)}>
                        Clear All Filters
                    </Button>

                   

                </Col>
                <Col span={12}>
                    <Button
                        className='search-button'
                        shape="round"
                        icon={<SearchOutlined />}
                        type="primary"
                        onClick={() => { handleSearch() }}>
                        Search
                    </Button>
                </Col>
                
            </Row>
            </div>

        </div>
    )
}

export default SearchandFilter;