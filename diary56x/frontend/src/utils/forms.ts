export interface FormDataField {
  value: string;
  checkers?: CustomValidators;
  transform?: (value: string) => string;
  errorMessage?: string;
  validators: Array<keyof typeof inBuiltValidators>;
}

export interface CustomValidators {
  [index: string]: Validator;
}

interface InBuiltValidators {
  required: Validator;
  email: Validator;
  slug: Validator;
}

export type FormBuilder = {
  [key: string]: FormDataField;
};

interface Validator {
  check: (value: string) => boolean;
  errorMessage: string;
}

type Validators = {
  [index in keyof InBuiltValidators]: InBuiltValidators[index];
};

export const inBuiltValidators: Validators = {
  required: {
    check: (value: string) => Boolean(value.length),
    errorMessage: "Это поле обязательно",
  },
  email: {
    check: (value: string) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
    errorMessage: "Некорректный адрес электронной почты",
  },
  slug: {
    check: (value: string) => /^[a-z0-9-]+$/i.test(value) && value.length > 2,
    errorMessage:
      "Некорректный формат ссылки - используйте только буквы, цифры и тире",
  },
};

/**
 * Validates a field
 * @param data Field to validate
 */
export const validateField = (data: FormDataField): boolean => {
  const { validators, transform, checkers } = data;
  let value = data.value;
  data.errorMessage = "";
  const errors: string[] = [];

  // In case data must be transformed before validation
  if (transform) value = transform(value);

  // Apply inbuilt validators
  validators.forEach((validator) => {
    const validatorFunction = inBuiltValidators[validator];
    if (!validatorFunction.check(value)) {
      errors.push(validatorFunction.errorMessage);
    }
  });

  // Apply custom validators
  if (checkers) {
    Object.keys(checkers).forEach((key) => {
      const validator = checkers[key];
      if (!validator.check(value)) {
        errors.push(validator.errorMessage);
      }
    });
  }

  data.errorMessage = errors.length ? errors[0] : "";

  return errors.length === 0;
};

export const validateForm = (data: FormBuilder): boolean => {
  let isValid = true;
  Object.keys(data).forEach((key) => {
    const res = validateField(data[key]);
    isValid = res && isValid;
  });
  return isValid;
};
