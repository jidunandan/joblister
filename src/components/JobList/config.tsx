import {Job} from './types'
interface Props {
    setShowDescription: Function
}
export const config = {
    columnDefs: (props: Props) => [
        {
            key: "0",
            title: "Company",
            dataIndex: 'company_name',
            fixed:'left',
            render: (company_name: string, record: Job) => {
                return (
                    <div>
                        <img src={record.company_logo} style={{ height: 20, width: 20, marginRight: 10 }} alt=""/>
                        {company_name}
                    </div>
                )
            },
            

        },
        {
            key: "1",
            title: "Job Title",
            dataIndex: 'title',
        },
        {
            key: "2",
            title: "Description",
            dataIndex: 'description',
            render: (description: String) => {
                return <a
                    onClick={() => {
                        props.setShowDescription(description)
                    }}
                >
                    Click to view description
                </a>
            }

        },
        {
            key: "3",
            title: "Category",
            dataIndex: 'category',
            

        },
        {
            key: "4",
            title: "Job Type",
            dataIndex: 'job_type',
            render: (jobType: String) => {
                let type = ''
                if (jobType === 'full_time')
                    type = 'Full Time'
                else if (jobType === 'part_time')
                    type = "Part Time"
                else if (jobType === 'freelance')
                    type = "Part Time"
                else if (jobType === 'internship')
                    type = "Internship"
                else if (jobType === 'contract')
                    type = "Contract"
                else
                    type = 'Not Mentioned'

                return <p>{type}</p>
            }

        },
        {
            key: "5",
            title: "Job Created On",
            dataIndex: 'publication_date',
            sorter: (a: any, b: any) => new Date(a.publication_date).valueOf() - new Date(b.publication_date).valueOf(),
            render: (date: any) => {
                return <p>{date.split('T')[0]}</p>
            },
            

        }
    ]
}