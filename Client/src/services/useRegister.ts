import { ref, computed, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { HTTP } from '@app/http';
import { useMessage } from './useMessage'

interface RegistrationForm {
  region: string | null;
  last_name: string;
  first_name: string;
  patronymic_name: string;
  phone_number: string;
  email: string;
  date_of_birth: string;
  username: string;
  password: string;
  re_password: string;
  personal_data_agreement: boolean;
}

interface Errors {
  username?: string;
  password?: string;
  non_field_errors?: string[];
}

export function useRegistration() {
  const router = useRouter();
  const form = ref<RegistrationForm>({
    region: null,
    last_name: '',
    first_name: '',
    patronymic_name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    username: '',
    password: '',
    re_password: '',
    personal_data_agreement: false,
  });

  const isLoading = ref(false);
  const errors: Ref<Errors> = ref({});
  const validated = ref(false);
  const validateClient = ref(false);
  const termsError = computed(() => validated.value && !form.value.personal_data_agreement);
  const { showMessage } = useMessage();
  const regexps = {
    name: /^[а-яА-ЯЁё\s]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
    username: /^[a-zA-Z0-9_@.+-]+$/,
  };

  const handleTermsState = () => {
    validated.value = false;
  };

  const validateInput = (value: string, regex: RegExp, minLength = 0): boolean => {
    return value.length > 0 && regex.test(value) && (minLength === 0 || value.length >= minLength);
  };

  const getErrorsValidate = (): boolean => {
    const requiredNameInputs = [form.value.last_name, form.value.first_name];
    const usernameInputs = [form.value.username, form.value.password, form.value.re_password];

    const hasRequiredNameErrors = requiredNameInputs.some(name => !validateInput(name, regexps.name));
    const hasOptionalNameError = form.value.patronymic_name !== '' && !validateInput(form.value.patronymic_name, regexps.name);
    const hasEmailError = !validateInput(form.value.email, regexps.email);
    const hasUsernameErrors = usernameInputs.some(input => !validateInput(input, regexps.username, 8));

    console.log('Required Name validation:', requiredNameInputs.map(name => validateInput(name, regexps.name)));
    console.log('Optional Name validation:', form.value.patronymic_name === '' || validateInput(form.value.patronymic_name, regexps.name));
    console.log('Email validation:', validateInput(form.value.email, regexps.email));
    console.log('Username validation:', usernameInputs.map(input => validateInput(input, regexps.username, 8)));
    console.log('Errors:', { hasRequiredNameErrors, hasOptionalNameError, hasEmailError, hasUsernameErrors });

    return hasRequiredNameErrors || hasOptionalNameError || hasEmailError || hasUsernameErrors;
  };

  const validateForm = (): boolean => {
    validateClient.value = getErrorsValidate();
    console.log('client', validateClient.value);
    return !validateClient.value;
  };

  const formatDateForBackend = (date: string | Date): string => {
    if (typeof date === 'string') {
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    }
    return date instanceof Date ? date.toISOString().split('T')[0] : String(date);
  };

  const registerUser = async () => {
    if (!validateForm()) {
      showMessage('Заполните поля в соответствии с указанным форматом', true);
      return;
    }
    try {
      isLoading.value = true;
      validated.value = true;
      const formData = { ...form.value, date_of_birth: formatDateForBackend(form.value.date_of_birth) };
      await HTTP.post('/register/', formData);
      showMessage('Успешно!', false);
      router.push('/');
    } catch (error: any) {
      errors.value = error.response?.data || {};
      const errorMessage = 'Ошибка регистрации: ' +
        (errors.value.non_field_errors?.[0] ||
          errors.value.username ||
          errors.value.password ||
          Object.values(errors.value).flat()[0] ||
          'Неизвестная ошибка');
      if (errors.value) {
        showMessage(errorMessage, true);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    form,
    isLoading,
    errors,
    validated,
    termsError,
    handleTermsState,
    registerUser,
  };
}