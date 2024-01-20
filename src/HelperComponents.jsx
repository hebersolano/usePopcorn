export function Loader() {
  return <div className="loader">Loading...</div>;
}

export function Error({ message }) {
  return <p className="error">{message}</p>;
}
