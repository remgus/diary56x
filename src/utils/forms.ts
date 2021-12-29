export interface FormDataField {
  value: string;
  checkers?: CustomValidators;
  transform?: (value: string) => string;
  errorMessage?: string;
  validators: Array<keyof typeof inBuiltValidators>;
  isBound?: boolean;
}

export interface CustomValidators {
  [index: string]: Validator;
}

interface InBuiltValidators {
  required: Validator;
  email: Validator;
  slug: Validator;
  password: Validator;
}

export type FormBuilder = {
  [key: string]: FormDataField;
};

export interface Validator {
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
  password: {
    check: (value: string) => value.length > 8,
    errorMessage: "Пароль должен быть не менее 8 символов",
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

export const validateForm = (data: FormBuilder, makeBound = true): boolean => {
  let isValid = true;
  Object.keys(data).forEach((key) => {
    const res = validateField(data[key]);
    isValid = res && isValid;
    if (makeBound) data[key].isBound = true;
  });
  return isValid;
};

/**
 * Mark every field of a form as bound.
 *
 * @param f A form
 */
export const boundForm = (f: FormBuilder): void => {
  Object.keys(f).forEach((key) => {
    f[key].isBound = true;
  });
};

/**
 * Mark every field of a form as unbound.
 *
 * @param f A form
 */
export const unboundForm = (f: FormBuilder): void => {
  Object.keys(f).forEach((key) => {
    f[key].isBound = false;
  });
};
