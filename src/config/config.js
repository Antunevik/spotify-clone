export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "84a4bca6fa9648218bf8973fac7439cd";
export const liveURL = "...";
export const devURL = "http://localhost:3000/";
export const redirectURL = devURL;
export const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
];

export const accessURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
