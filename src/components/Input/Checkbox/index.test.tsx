/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { CheckboxInput } from '.';

describe('Components > Input > Checkbox', () => {
  it('should render correctly', () => {
    const mockOnChange = jest.fn();
    const result = render(
      <CheckboxInput checked={false} onChange={mockOnChange} />
    );

    const input = result.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  describe('handles change events correctly', () => {
    describe('when enabled', () => {
      it('when previously false', () => {
        const mockOnChange = jest.fn();
        const result = render(
          <CheckboxInput checked={false} onChange={mockOnChange} />
        );

        const input = result.getByRole('checkbox');
        fireEvent.click(input);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(true);
      });

      it('when previously true', () => {
        const mockOnChange = jest.fn();
        const result = render(
          <CheckboxInput checked={true} onChange={mockOnChange} />
        );

        const input = result.getByRole('checkbox');
        fireEvent.click(input);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(false);
      });
    });

    it('when disabled', () => {
      const mockOnChange = jest.fn();
      const result = render(
        <CheckboxInput checked={false} disabled onChange={mockOnChange} />
      );

      const input = result.getByRole('checkbox');
      fireEvent.click(input);

      expect(mockOnChange).toHaveBeenCalledTimes(0);
    });
  });
});
