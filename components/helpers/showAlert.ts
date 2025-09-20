import { Alert, AlertButton, AlertOptions } from 'react-native';
import { ZodError } from 'zod';
import { toProperCase } from './toProperCase';

export const showErrorAlert = (
  error: Error,
  title: string = 'Error',
  buttons?: AlertButton[],
  options?: AlertOptions
) => {
  let message = error.message;

  if (error instanceof ZodError && error.issues.length > 0) {
    const issue = error.issues[0];
    const path = toProperCase(issue.path.join('.'));
    message = path.length > 0 ? `${path} is ${issue.message.toLowerCase()}` : issue.message;
  }

  Alert.alert(title, message, buttons, options);
};
