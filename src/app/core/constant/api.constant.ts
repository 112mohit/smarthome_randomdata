import { environment } from "../../../environments/environment";

let basePath = environment.APIPath;

export const APIConstant = {
    basePath: basePath,
    sensorData: `${basePath}sensordata`,
    tv: `${basePath}tv`,
    light: `${basePath}light`,
    ac: `${basePath}ac`,
    heating: `${basePath}heating`,
    history: `${basePath}history`,
    restaurant: `${basePath}restaurant`,
    login: `${basePath}auth/signin`,
    register: `${basePath}auth/signup`,
    me: `${basePath}me`,
    user: `${basePath}user`,
    changePassword: `${basePath}changepassword`,
}
