import { useEffect, useState } from 'react';
import AlertBox from '../components/AlertBox';
import JobItem from '../components/JobItem';
import Layout1 from '../components/Layouts/Layout1';
import { jobApiBaseUrl } from '../utils/config';
import { useFetch } from '../utils/custom-hooks/fetch.hook';

const jobListUrl = `${jobApiBaseUrl}/job-list`;
const limitPerPage = 18; // limit data per page from source API

const Job = () => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { data, isLoading, error, startFetch } = useFetch();

  const submitFilter = (event) => {
    event.preventDefault();

    setJobList([]);
    if (page === 1) {
      filterJob();
    } else {
      setPage(1); // trigger useEffect #2
    }
  };

  const filterJob = () => {
    const jobDesc = document.getElementById('job-desc').value;
    const jobLocation = document.getElementById('job-location').value;
    const jobFullTime = document.getElementById('full-time').checked;

    const params = {
      description: jobDesc,
      location: jobLocation,
      ...jobFullTime && { full_time: true },
      ...page > 1 && { page },
    };

    startFetch(jobListUrl, 'GET', params);
  };

  const JobContainer = () => {
    return (
      <div className="job-list">
        {jobList.map((props, index) => (
          <JobItem key={`job-item-${index}`} {...props} />
        ))}
        {showMoreButton ? (
          isLoading ? (
            <p className="text-center">Loading Data..</p>
          ) : (
            <div className="d-grid gap-2 pt-2">
              <button
                className="btn btn-primary mb-3"
                onClick={() => setPage(page + 1)} // trigger useEffect #2
                type="button"
              >
                More Jobs
              </button>
            </div>
          )
        ) : (
          <p className="text-center text-success border-top pt-5">End of data</p>
        )}
      </div>
    );
  };

  // #1 - once after loading page
  useEffect(() => {
    document.title = 'Job List';
  }, []);

  // #2 - when loading jobs after first load, filtering jobs, loading more jobs
  useEffect(() => {
    filterJob();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // #3 - when state 'data' is updated by 'startFetch()'
  useEffect(() => {
    if (!data.jobs) {
      return;
    }

    // filter because there are invalid data structure from source API
    const result = data.jobs.filter(row => row && row.id);

    if (result.length < limitPerPage) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }

    setJobList([
      ...jobList,
      ...result
    ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Layout1>
      {/* show error fetch API */}
      {error && (
        <AlertBox type="danger" msg={error} withClass="col-md-6 m-auto" />
      )}
      <form className="row g-3 pt-3" onSubmit={submitFilter}>
        <div className="col-md-4">
          <label htmlFor="job-desc" className="form-label">
            Job Description
          </label>
          <input type="text" className="form-control" id="job-desc" />
        </div>
        <div className="col-md-4">
          <label htmlFor="job-location" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" id="job-location" />
        </div>
        <div className="col-md-2">
          <div className="form-check" style={{ marginTop: '37px' }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="full-time"
            />
            <label className="form-check-label" htmlFor="full-time">
              Full Time Only
            </label>
          </div>
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '30px' }}
          >
            Search
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Job List</h1>
      </div>
      {/* list job */}
      {jobList.length ? (
        <JobContainer />
      ) : isLoading ? (
        <p className="text-center">Loading Data..</p>
      ) : (
        <p className="text-center text-danger">No Jobs Found</p>
      )}
    </Layout1>
  );
};

export default Job;
