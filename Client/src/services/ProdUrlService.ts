
export function showByUrl() {
  let value = false;
  console.log('test', (localStorage.getItem('user') as string) == '1')
  if (window.location.hostname === 'localhost'
    || window.location.hostname === 'rso.sprint.1t'
    || window.location.hostname === '213.139.208.147'
    || window.location.hostname === '127.0.0.1'
    || (localStorage.getItem('user') as string) == '1') {
    value = true;
  }

  return value;
}