import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { HTTP } from '@app/http';
import Swal from 'sweetalert2';

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
  const isError = ref<Record<string, string>>({});
  const validated = ref(false);
  const validateClient = ref(false);
  const swal = inject('$swal') as typeof Swal;
  const termsError = computed(() => validated.value && !form.value.personal_data_agreement);

  const regexps = {
    name: /^[а-яА-ЯЁё\s]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
    username: /^[a-zA-Z0-9_@.+-]+$/,
  };

  const handleTermsState = () => {
    validated.value = false;
  };

  const showMessage = (message: string, isError: boolean) => {
    swal.fire({
      position: 'center',
      icon: isError ? 'error' : 'success' as const,
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
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
      console.error('Registration error:', error);
      isError.value = error.response?.data || {};
      if (isError.value) {
        showMessage('Ошибка', true);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    form,
    isLoading,
    isError,
    validated,
    termsError,
    handleTermsState,
    registerUser,
  };
}