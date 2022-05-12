const AlertBox = ({ type, msg, withClass = '' }) => {
  return (
    <div
      role="alert"
      className={`alert alert-${type} py-1 text-center ${withClass}`}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {msg}
    </div>
  );
};

export default AlertBox;
