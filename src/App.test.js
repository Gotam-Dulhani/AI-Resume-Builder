import { render, screen } from '@testing-library/react';
import AIResumeBuilder from './App';

test('renders AI Resume Builder title', () => {
  render(<AIResumeBuilder />);
  const titleElement = screen.getByText(/AI Resume Builder/i);
  expect(titleElement).toBeInTheDocument();
});