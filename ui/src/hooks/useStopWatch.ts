import {ref, Ref} from "vue";

function addZero(n: number): string {
    return n <= 9 ? `0${n}` : `${n}`
}

function useStopWatch(startedAt: number = Date.now()) {

    let startTime: number = Date.now()
    let bufferSeconds: number = Math.floor((Date.now() - startedAt) / 1000)
    let timer: Ref = ref(undefined)
    let renderedTimeString: Ref<string> = ref(renderTime())

    function play() {
        if (timer.value) return;

        startTime = Date.now()
        timer.value = setInterval(() => updateTimer(), 1000)
    }

    function pause() {
        if (!timer.value) return

        bufferSeconds += Math.floor((Date.now() - startTime) / 1000)
        clearInterval(timer.value)
        timer.value = undefined
    }

    function updateTimer() {
        renderedTimeString.value = renderTime()
    }

    function getSecondsCount(): number {
        return Math.floor((Date.now() - startTime) / 1000) + bufferSeconds
    }

    function renderTime(): string {
        let seconds = getSecondsCount()

        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60

        if (hours == 0) {
            return `${addZero(minutes)}:${addZero(seconds)}`
        }

        return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
    }

    return {
        rendered: renderedTimeString, play, pause, getSecondsCount, timer
    }
}

export default useStopWatch