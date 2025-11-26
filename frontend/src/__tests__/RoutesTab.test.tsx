// frontend/src/__tests__/RoutesTab.test.tsx
// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import RoutesTab from '../adapters/ui/RoutesTab';
import axios from 'axios';

// Mock axios module
vi.mock('axios');

describe('RoutesTab', () => {
  it('should render routes table', async () => {
    const mockRoutes = [
      {
        id: "R001",
        vesselType: "Container",
        fuelType: "HFO",
        year: 2024,
        ghgIntensity: 91.0,
        fuelConsumption: 5000,
        distance: 12000,
        totalEmissions: 4500,
        isBaseline: true,
      },
    ];

    // Mock axios.get to return mockRoutes
    vi.mocked(axios.get).mockResolvedValue({ data: mockRoutes });

    render(<RoutesTab />);

    // Wait for the text to appear in the document
    await waitFor(() => {
      expect(screen.getByText("Routes")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("R001")).toBeInTheDocument();
    });
  });
});
