
export const APP_BASE_URL = process.env.NODE_ENV === "development" ? process.env.KINDE_SITE_URL : "";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;


const appConstants = {
    APP_BASE_URL,
    ADMIN_EMAIL,
}

export default appConstants;