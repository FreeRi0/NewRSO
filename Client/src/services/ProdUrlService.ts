
export function showByUrl() {
  let value = false;
  if (window.location.hostname === 'localhost' || window.location.hostname === 'rso.sprint.1t' || window.location.hostname === '213.139.208.147' || (localStorage.getItem('user') as string) == '1' ) {
    value = true;
  }

  return value;
}