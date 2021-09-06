const production = "deployment url";
const development = "http://localhost:3001/api";
export const BACKEND_API_URL = process.env.NODE_ENV ? production : development;
