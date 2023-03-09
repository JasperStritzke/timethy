import {defineStore} from "pinia";
import {useAlertsStore} from "../components/alert/alert.manager";
import router from "../plugins/router";

export type AuthInformation = {
    userInfo?: UserInfo,
}

export type UserInfo = {
    username: string,
}

function getAuthData(): UserInfo | undefined {
    let data;
    if ((data = localStorage.getItem("auth"))) {
        return JSON.parse(data) as UserInfo
    }

    return undefined
}

export const useUserAuth = defineStore('auth', {
    state: (): AuthInformation => ({
        userInfo: getAuthData(),
    }),
    actions: {
        login(): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                const startTimeStamp = Date.now()

                this.userInfo = {username: "Jasper Stritzke"}
                localStorage.setItem("auth", JSON.stringify(this.userInfo))
                useAlertsStore().dispatchAlert({
                    message: "Successfully logged in.",
                    type: "success"
                })
                router.push("/").catch()
                //validation

                let diff: number
                if ((diff = Date.now() - startTimeStamp) < 500) {
                    setTimeout(resolve, diff)
                    return
                }

                resolve()
            })
        },
        logout() {
            this.userInfo = undefined
            localStorage.removeItem("auth")
            useAlertsStore().dispatchAlert({
                message: "Successfully logged out.",
                type: "success"
            })
            router.push("/login").catch()
        }
    },
    getters: {
        isLoggedIn(): boolean {
            return !!this.userInfo
        },
        userInitials(): string {
            if (!this.isLoggedIn)
                return "??"

            const name: Array<string> = this.userInfo!.username.split(" ");
            return name[0].charAt(0) + name[name.length - 1].charAt(0)
        }
    }
})