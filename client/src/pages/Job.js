import { useEffect, useState } from 'react';
import AlertBox from '../components/AlertBox';
import Layout1 from '../components/Layouts/Layout1';
import { useFetchGet } from '../utils/custom-hooks/fetch.hook';
import { timeSince } from '../utils/helpers';

const JobItem = (props) => {
  return (
    <div className="job-row border-top pt-2">
      <div>
        <p className="job-title">{props.title}</p>
        <p>
          <span className="job-company">{props.company}</span> &#8212;{' '}
          <span className="job-type">{props.type}</span>
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p className="job-location">{props.location}</p>
        <p className="job-post-time">{timeSince(props.created_at)} ago</p>
      </div>
    </div>
  );
};

const initialEndpoint = '/job-list';
const knownDataPerPage = 18;

const User = () => {
  const [jobList, setJobList] = useState([]);
  const [endPoint, setEndPoint] = useState(initialEndpoint);
  const [page, setPage] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { data, isLoading, error, startFetch } = useFetchGet(endPoint);

  const filterJob = (e) => {
    e.preventDefault();

    let params = '?';
    const jobDesc = document.getElementById('job-desc').value;
    const jobLocation = document.getElementById('job-location').value;
    const jobFullTime = document.getElementById('full-time').checked;
    if (jobDesc) {
      params += `description=${jobDesc}&`;
    }
    if (jobLocation) {
      params += `location=${jobLocation}&`;
    }
    if (jobFullTime) {
      params += `full_time=true&`;
    }

    setEndPoint(initialEndpoint + params);
  };

  const showJobs = () => {
    return (
      <div className="job-list">
        {jobList.map((props, index) => (
          <JobItem key={`job-item-${index}`} {...props} />
        ))}
        {showMoreButton && (
          <div className="d-grid gap-2 pt-2">
            <button
              className="btn btn-primary mb-3"
              onClick={() => setPage(page + 1)}
              type="button"
            >
              More Jobs
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (page === 1) return;

    let newEndpoint = endPoint;
    if (!newEndpoint.includes('?')) {
      newEndpoint += '?';
    }

    setEndPoint(`${newEndpoint}page=${page}&`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    startFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.jobs) {
      // filter because there are invalid data
      const result = data.jobs.filter(row => row && row.id);

      if (knownDataPerPage > result.length) {
        setShowMoreButton(false);
      }

      if (endPoint.includes('page=')) {
        console.log('set job list');
        setJobList([
          ...jobList,
          ...result
        ]);
      } else {
        setJobList(result);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // when filtering jobs or display more jobs
  useEffect(() => {
    if (!endPoint.includes('?')) {
      return;
    }

    startFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoint]);

  return (
    <Layout1>
      {/* show error fetch API */}
      {error && (
        <AlertBox type="danger" msg={error} withClass="col-md-6 m-auto" />
      )}
      <form className="row g-3 pt-3" onSubmit={filterJob}>
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
      {isLoading
        ? (<p className="text-center">Loading Data..</p>)
        : jobList.length
          ? showJobs()
          : (<p className="text-center text-danger">No Jobs Found</p>)
      }
    </Layout1>
  );
};

export default User;
