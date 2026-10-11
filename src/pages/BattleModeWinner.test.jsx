import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BattleModeWinner from './BattleModeWinner'

function setup(provider) {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/battle/winner',
          state: {
            provider,
            content: 'Winning text',
            duration: 1200,
            agentName: 'Test Agent',
          },
        },
      ]}
    >
      <Routes>
        <Route path="/battle/winner" element={<BattleModeWinner />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BattleModeWinner theme', () => {
  it('renders every winner with the same monochrome zinc theme', () => {
    const { container } = setup({ color: 'white', label: 'OpenRouter' })
    expect(screen.getByText('OpenRouter')).toBeInTheDocument()
    expect(container.querySelector('.text-zinc-400')).not.toBeNull()
  })

  it('keeps the openai winner monochrome', () => {
    const { container } = setup({ color: 'white', label: 'GPT-4o' })
    expect(container.querySelector('.text-zinc-400')).not.toBeNull()
  })
})
