import { google } from "googleapis";

// creates the OAuth object for one-time YouTube API authentication
export const youtubeOAuth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_YOUTUBE_REDIRECT_URI // redirect URI after authorization
);