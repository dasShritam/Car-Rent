export function Map({ location }) {
  const { iframeSource = `${location.map}` } = location;
  return <div dangerouslySetInnerHTML={{ __html: iframeSource }}></div>;
}
