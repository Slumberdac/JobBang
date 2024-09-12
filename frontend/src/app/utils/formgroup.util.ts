import { FormGroup } from '@angular/forms';

export function getAllErrorsInFormGroup(control: FormGroup): string[] {
  const errors: string[] = [];
  Object.keys(control.controls).forEach((key) => {
    const controlErrors = control.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        errors.push(`${key} ${keyError}`);
      });
    }
  });
  return errors;
}

export function markAllAsTouched(control: FormGroup): void {
  Object.keys(control.controls).forEach((key) => {
    control.get(key)?.markAsTouched();
  });
}
