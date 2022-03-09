import React, { useEffect, useState } from 'react'
import { Table, Modal, Button } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { config } from './config'
import './joblist.css'
import SearchandFilter from './SearchandFilter'
import { Job } from './types'
import Loader from '../Loader/Loader'

const baseURL = "https://remotive.io/api/remote-jobs"

const JobList = () => {
    const [jobs, setJobs] = useState<any>([])
    const [jobCount, setJobCount] = useState<number>(0)
    const [filteredJobs, setFilteredJobs] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filterCompany, setFilterCompany] = useState(null)
    const [showErrorPopup, setErrorPopup] = useState<boolean>(false);
    const [companyList, setCompaniesList] = useState<any>([]);
    const [description, setShowDescription] = useState<string>('')
    const [categories, setCategories] = useState<any>([])
    const [categoryFilters, setCategoryFilters] = useState<any>([])
    const columnDefs: any = config.columnDefs({ setShowDescription: setShowDescription })
    const handleSearch = () => {
        let jobsArray = jobs;
        if (searchTerm) {
            jobsArray = jobsArray.filter(
                (job: Job) =>
                    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.category.toLowerCase().includes(searchTerm.toLowerCase())

            );
        }
        if (filterCompany) {
            jobsArray = jobsArray.filter(
                (job: Job) =>
                    job.company_name.includes(filterCompany)
            );

        }
        if (categoryFilters.length > 0) {
            let filters: Array<String> = categoryFilters
            jobsArray = jobsArray.filter(
                (job: Job) =>
                    filters.includes(job.category)
            );
        }
        setFilteredJobs(jobsArray)
    }
    // const handleSearch = async () => {//since all the data is retrieved in the beginning, using an extra call wont be ideal
    //     setLoading(true)
    //     try {
    //         let params = {}
    //         if (searchTerm || filterCompany) {
    //             params = { search: searchTerm, company_name: filterCompany }
    //         }
    //         const response = await axios.get(baseURL, {
    //             params
    //         });
    //         //console.log(response);
    //         setJobs(response.data.jobs);
    //         setJobCount(response.data['job-count'])
    //     } catch (err) {
    //         console.log(err);
    //         alert("We are experiencing technical difficulties.Please try again later.")//showpopasinenv
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    const populateCategoryList = (jobData: any) => {
        var unique = [];
        var distinctCategories: any = [];
        for (let i = 0; i < jobData.length; i++) {
            if (!unique[jobData[i].category]) {
                distinctCategories.push(jobData[i].category);
                unique[jobData[i].category] = 1;
            }
        }
        setCategories(distinctCategories)
    }
    const populateCompanyList = (jobData: any) => {
        var unique = [];
        var distinctCompanies: any = [];
        for (let i = 0; i < jobData.length; i++) {
            if (!unique[jobData[i].company_name]) {
                distinctCompanies.push(jobData[i].company_name);
                unique[jobData[i].company_name] = 1;
            }
        }
        setCompaniesList(distinctCompanies)
    }
    const fetchAllJobs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(baseURL);
            let jobData = response.data.jobs;
            jobData.map((job: Job) => job.key = job.id)
            setJobs(jobData);
            setFilteredJobs(jobData);
            setJobCount(response.data['job-count'])
            if (jobData.length != 0) {
                populateCompanyList(jobData)
                populateCategoryList(jobData)
            }
        } catch (err) {
            setErrorPopup(true);
        } finally {
            setLoading(false);
        }
    }
    const clearFilter = (reloadData: boolean) => {
        reloadData ? fetchAllJobs() : setFilteredJobs(jobs)
        setSearchTerm('')
        setFilterCompany(null)
        setCategoryFilters([])
    }

    useEffect(() => {
        fetchAllJobs()
    }, [])
    return (
        <div className="job-list">

            <SearchandFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCompany={filterCompany}
                setFilterCompany={setFilterCompany}
                companyList={companyList}
                clearFilter={clearFilter}
                handleSearch={handleSearch}
                categories={categories}
                categoryFilters={categoryFilters}
                setCategoryFilters={setCategoryFilters}
            />
            {!loading && (<div>
                {jobCount == 0 ? 'No matches found' :
                    `We found ${filteredJobs.length} job(s) based on your search `}
            </div>)}
            {!loading ?
                <div className='table-container'>
                    <Table
                        className="job-list-table"
                        columns={columnDefs}
                        dataSource={filteredJobs} />
                </div> :
                <Loader message="Please wait while we fetch the jobs" />
            }

            <Modal
                title="Application Error"
                centered
                visible={showErrorPopup}
                onCancel={() => { setErrorPopup(false) }}
                footer={[
                    <Button key="back" onClick={() => setErrorPopup(false)} >
                        Close
                    </Button>]}>

                We are experiencing technical difficulties.Please try again later.
            </Modal>
            <Modal
                title='Description'
                bodyStyle={{ height: '400px', display: 'flex' }}
                centered
                destroyOnClose
                visible={description != ''}
                onCancel={() => setShowDescription('')}
                footer={[
                    <Button key="back" onClick={() => setShowDescription('')}>
                        Close
                    </Button>]}
            >
                <div style={{ height: '100%', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: description }} />
            </Modal>
        </div>

    )

}
export default JobList;