import {defineStore} from "pinia";

export type Alert = {
    message: string,
    type: "success" | "error" | "warning" | "info",
    id?: string,
}

function generateRandomId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export const useAlertsStore = defineStore('alerts', {
    state() {
        return {
            alerts: new Set<Alert>()
        }
    },
    actions: {
        dispatchAlert(alert: Alert) {
            alert.id = generateRandomId()
            this.alerts.add(alert)
        },
        closeAlert(alert: Alert) {
            this.alerts.delete(alert)
        }
    }
})

export const ALERT_CLOSE_TIME_MS = 4000;