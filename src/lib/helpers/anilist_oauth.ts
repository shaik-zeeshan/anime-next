export type ConfigType = {
      appDomain: string;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
};

const oauth = (config: ConfigType) => {
      const getAuthURL = () => {
            return `${config.appDomain}/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code`;
      };

      const getTokens = async (code: string) => {
            const req = await fetch("https://anilist.co/api/v2/oauth/token", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                  },
                  body: JSON.stringify({
                        grant_type: "authorization_code",
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        redirect_uri: config.redirectUri,
                        code,
                  }),
            });
            return await req.json();
      };

      return { getAuthURL, getTokens };
};

export default oauth;
