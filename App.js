import Navigation from './Navigation';
import { useState } from 'react';
import SisApi from './api';
import userContext from "./userContext";

/** App: Renders navigation for entire app.
 *
 * State:
 * token: string
 * user: string
 *
 * Props:
 * none
  */
export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  /** Logs a user in by retrieving token from api
   * and setting token and user
  */
  async function loginUser(username, password) {
    const resToken = await SisApi.login(username, password);

    if (resToken) {
      SisApi.token = resToken;
      setToken(resToken);
      setUser(username);
    };
  }

  return (
    <userContext.Provider value={{ loginUser, token, user }}>
      <Navigation />
    </userContext.Provider>
  );
}
