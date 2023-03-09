import {inject, InjectionKey, onBeforeUnmount, onMounted, provide, ref, Ref} from "vue";

export type UiFieldValidationResult = boolean | string
export type UiFieldValidationRule = (value: any) => UiFieldValidationResult
export type UiFieldRules = Array<UiFieldValidationRule>
export type UiFormValidateMethod = () => boolean;
export type UiFormRegistrationMethod = (method: UiFormValidateMethod) => void;

export interface ModelInternalUiForm {
    lazyValidation?: Ref<boolean>,
    register: UiFormRegistrationMethod,
    unregister: UiFormRegistrationMethod,
}

const formSymbol = Symbol() as InjectionKey<ModelInternalUiForm>

export default formSymbol

//hooks
/**
 * hook to set up a local form, working in combination with {@link useUiField}
 * @param isLazyValidation
 * @return validate function
 */
function useUiForm(isLazyValidation: Ref<boolean> = ref(false)): () => boolean {
    const lazyValidation = ref(isLazyValidation)

    const validationMethods: Set<UiFormValidateMethod> = new Set<UiFormValidateMethod>()

    function register(method: UiFormValidateMethod) {
        validationMethods.add(method)
    }

    function unregister(method: UiFormValidateMethod) {
        validationMethods.delete(method)
    }

    function validate(): boolean {
        let valid = true

        for (let method of validationMethods) {
            if (!method()) {
                valid = false
            }
        }

        return valid
    }

    provide(
        formSymbol,
        {
            lazyValidation,
            register,
            unregister
        }
    )

    return validate
}

export {useUiForm}

export interface ModelUiFieldHandle {
    validate: () => boolean,
    resetValidation: () => void,
    error: Ref<string>,
    isLazyValidation?: Ref<boolean>,
}

function useUiField(modelValueRef: Ref, rules: Ref<UiFieldRules>): ModelUiFieldHandle {
    let uiForm = inject(formSymbol, undefined)

    const error = ref<string>("")

    function validate(): boolean {
        error.value = ""

        for (let rule of rules.value) {
            let validationResult = rule(modelValueRef.value)

            if (validationResult === true) {
                continue
            }

            if (typeof validationResult !== "string" || validationResult.length === 0) {
                validationResult = "Invalid field"
            }

            error.value = validationResult
            return false
        }

        return true
    }

    //if not, field is in standalone mode
    if (uiForm) {
        onMounted(() => {
            uiForm!.register(validate)
        })

        onBeforeUnmount(() => {
            uiForm!.unregister(validate)
        })
    }

    return {
        validate,
        error,
        resetValidation: () => error.value = "",
        isLazyValidation: uiForm?.lazyValidation
    }
}

export {useUiField}

export class UiFieldBaseProps {
}