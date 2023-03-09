import axios, {AxiosError, isAxiosError} from "axios";
import {useAlertsStore} from "../components/alert/alert.manager";
import router from "./router";

//keep cookies and send them
axios.defaults.withCredentials = true

axios.defaults.baseURL = process.env.BASE_URL

axios.interceptors.response.use(undefined, error => {
    if (isAxiosError(error)) {
        const axiosError = new AxiosError
        if (!axiosError.status) {
            useAlertsStore().dispatchAlert({
                message: "Unable to reach API. Are you online?",
                type: "error"
            })
            return Promise.reject(undefined)
        }

        if (axiosError.status == 401) {
            useAlertsStore().dispatchAlert({
                message: "You've been automatically logged out.",
                type: "error",
            })
            router.push("/login").catch()
            return Promise.reject(undefined)
        }

        return Promise.reject(error)
    }

    useAlertsStore().dispatchAlert({
        message: "An unknown error occurred.",
        type: "error"
    })

    console.error("(!) Sadly, an unknown error occurred: ", error)
    return Promise.reject(null)
})
