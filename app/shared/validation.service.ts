export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }
  
  static emailValidator(control) {
    try{
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  catch {
    return null;
  }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 20 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    try
    {
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      };
    }
    catch {
      return null;
    }
  }
}