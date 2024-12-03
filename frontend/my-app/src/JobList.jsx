import { useState } from 'react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchJobs = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/jobs/${keyword}`);
            const data = await response.json();
            console.log(data); // Check what data is returned
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Job Search</h1>
            <input 
                type="text" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Enter job keyword" 
                className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <button 
                onClick={fetchJobs} 
                className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition"
            >
                Fetch Jobs
            </button>
            <div className="mt-4">
                {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow-md mb-2">
                            <h3 className="font-semibold">{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                        </div>
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default JobList;