import Cookies from 'universal-cookie';

class CookieService {
  static getAccessToken = () => {
    const cookie = new Cookies();
    return cookie.get('authenticationToken');
  };

  static getRefreshToken = () => {
    const cookie = new Cookies();
    return cookie.get('refreshToken');
  };

  static setAccessToken = (token: string) => {
    const cookie = new Cookies();
    return cookie.set('authenticationToken', token, { path: '/' });
  };

  static setRefreshToken = (token: string) => {
    const cookie = new Cookies();
    return cookie.set('refreshToken', token, {
      path: '/',
    });
  };

  static removeAll = () => {
    const cookie = new Cookies();
    cookie.remove('authenticationToken', {
      path: '/',
    });
    cookie.remove('refreshToken', {
      path: '/',
    });
  };
}

export default CookieService;
