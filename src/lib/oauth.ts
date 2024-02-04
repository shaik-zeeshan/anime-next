import oauth, { ConfigType } from "./helpers/anilist_oauth";

const appURL = process.env.APP_URL
      ? `https://${process.env.APP_URL}`
      : "http://localhost:3000";

const config: ConfigType = {
      appDomain: process.env.ANILIST_DOMAIN as string,
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      redirectUri: `${appURL}${process.env.REDIRECT_URI}` as string,
};

const anilist = oauth(config);

export default anilist;
