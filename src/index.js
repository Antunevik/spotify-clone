import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { ThemeProvider } from "@mui/system";
import { themeOptions } from "./style/material-themes.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/reducers/configureStore";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a4bca6fa9648218bf8973fac7439cd",
  clientSecret: "1aa54ab716e144998148f18e033ef5ef",
  redirectUri: "http://localhost:3000/", // <--- byt inför deploy samt byt på dashboarden
});
const store = configureStore(spotifyApi);
console.log("Redux Store", store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={themeOptions}>
          <App spotifyApi={spotifyApi} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
