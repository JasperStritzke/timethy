import {getCurrentInstance, onMounted, Ref, ref} from "vue";

/**
 * @return reactive ref of components uid
 */
function useId(): Ref<number | undefined> {
    const id = ref<number>(-1)

    onMounted(() => {
        id.value = getCurrentInstance()!.uid!
    })

    return id
}

export default useId