import Cookies from 'universal-cookie';

export function getCSRF() {
  const cookies = new Cookies();
  return cookies.get('csrftoken');
}
