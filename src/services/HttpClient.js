import axios from 'axios';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.language = 'en';
    this.params = () => (`?country=CN&language=${this.language}`);
    this.axios = axios;
  }

  concatUrl(isToken, tokenOrGuestId, subjectUrl) {
    if (isToken) {
      return `${this.baseUrl}/users/me/${subjectUrl}${this.params()}&token=${tokenOrGuestId}`;
    } else {
      return `${this.baseUrl}/guests/${tokenOrGuestId}/${subjectUrl}${this.params()}`;
    }
  };

  concatUrlPassParams(isToken, tokenOrGuestId, subjectUrl, params) {
    if (isToken) {
      return `${this.baseUrl}/users/me/${subjectUrl}${params}&token=${tokenOrGuestId}`;
    } else {
      return `${this.baseUrl}/guests/${tokenOrGuestId}/${subjectUrl}${params}`;
    }
  };

  fetch(isToken, tokenOrGuestId, subjectUrl, params) {
    const url = this.concatUrl(isToken, tokenOrGuestId, subjectUrl);
    return axios({...params, url});
  }

  fetchParams(isToken, tokenOrGuestId, subjectUrl, query, params) {
    const url = this.concatUrlPassParams(isToken, tokenOrGuestId, subjectUrl,
        query);

    return axios({...params, url});
  }

  setLanguage(newLanguage) {
    this.language = newLanguage
  }
}
const env = process.env.env;
export default new HttpClient(`https://preprod-api.apps.burberry.com/v1/ecom-env-proxy/${env|| 'qa4'}`);
