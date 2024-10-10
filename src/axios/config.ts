import env from "react-dotenv";
export const baseURL =
  env.REACT_ENVIRONMENT === "dev" ? env.APP_API_URL_DEV : env.APP_API_URL_PROD;

// TODO console.log(`*${env.REACT_ENVIRONMENT}* Environments\nBaseURL : ${baseURL}`);
