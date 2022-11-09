import { render, screen } from '@testing-library/react';
import Form from '../components/Form/Form';

test(' form submit', () => {
  render(<Form />);
  const FormElement = screen.getAllByRole('form', { name: 'submit' });
  expect(FormElement).toThrow();
});
