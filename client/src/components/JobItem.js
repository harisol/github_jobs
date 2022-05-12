import { timeSince } from "../utils/helpers";

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

export default JobItem;
