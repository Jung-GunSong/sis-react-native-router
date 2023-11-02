// const BASE_URL = "http://192.168.0.246:8000/api";
const BASE_URL = "http://192.168.1.79:8000/api";


/** API Class.
 *
 */

class SisApi {

  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    let headers = {
      'content-type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Token ${this.token}`;
    }
    console.log('headers inside api,', headers)

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  /** Returns token upon logging in. */
  static async login(username, password) {
    const data = { username, password };

    let res = await this.request(`-token/`, data, 'POST');

    return res.token;
  }

  static async getLectures() {

    let res = await this.request(`lecturesessions/`);

    return res.results;
  }

  static async getLecture(id) {

    let res = await this.request(`lecturesessions/${id}/`);

    return res;
  }

}


export default SisApi;