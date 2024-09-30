export function showByUrl() {
  let value = false;
  if (window.location.hostname === 'localhost' || window.location.hostname === 'rso.sprint.1t' || window.location.hostname === '213.129.208.147:30000') {
    value = true;
  }
  return value;
}