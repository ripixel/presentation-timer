/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { NumberInput } from '.';

describe('Components > Input > Number', () => {
  describe('should render correctly', () => {
    it('with no placeholder', () => {
      const mockOnChange = jest.fn();
      const result = render(<NumberInput onChange={mockOnChange} value={0} />);

      const input = result.getByDisplayValue('0');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('with a placeholder', () => {
      const mockOnChange = jest.fn();
      const result = render(
        <NumberInput
          onChange={mockOnChange}
          value={0}
          placeholder='Placeholder Test'
        />
      );

      const input = result.getByDisplayValue('0');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('placeholder', 'Placeholder Test');
    });
  });

  it('handles change events correctly', async () => {
    const mockOnChange = jest.fn();
    const result = render(<NumberInput onChange={mockOnChange} value={0} />);

    const input = result.getByDisplayValue('0');
    fireEvent.change(input, { target: { value: '1' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });
});
