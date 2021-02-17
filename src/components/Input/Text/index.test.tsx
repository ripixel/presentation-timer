/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { TextInput } from '.';

describe('Components > Input > Text', () => {
  describe('should render correctly', () => {
    it('with no placeholder', () => {
      const mockOnChange = jest.fn();
      const result = render(<TextInput onChange={mockOnChange} value='Test' />);

      const input = result.getByDisplayValue('Test');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('with a placeholder', () => {
      const mockOnChange = jest.fn();
      const result = render(
        <TextInput
          onChange={mockOnChange}
          value='Test'
          placeholder='Placeholder Test'
        />
      );

      const input = result.getByDisplayValue('Test');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('placeholder', 'Placeholder Test');
    });
  });

  it('handles change events correctly', async () => {
    const mockOnChange = jest.fn();
    const result = render(<TextInput onChange={mockOnChange} value='Test' />);

    const input = result.getByDisplayValue('Test');
    fireEvent.change(input, { target: { value: 'New' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('New');
  });
});
