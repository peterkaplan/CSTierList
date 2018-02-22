export default function getPrefix() {
  if (window.location.host.indexOf('eecs.umich.edu') !== -1) {
    return '/t53ot2gx';
  }
  return '';
}
