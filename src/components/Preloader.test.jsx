import { StrictMode } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import Preloader from './Preloader'

const BOOT_MS = 350
const PROGRESS_MS = 1000
const PROGRESS_HOLD_MS = 150
const REVEAL_MS = 750
const EXIT_MS = 500
const TOTAL_MS = BOOT_MS + PROGRESS_MS + PROGRESS_HOLD_MS + REVEAL_MS + EXIT_MS

function mockMatchMedia(matches = false) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

function advance(ms) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

describe('Preloader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockMatchMedia(false)
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    document.documentElement.classList.remove('preloader-active')
  })

  it('shows integer progress and reaches the progress stage', () => {
    render(<Preloader onFinish={vi.fn()} />)

    expect(screen.getByText('initializing runtime…')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: /Loading Open Agents/i })).toHaveAttribute(
      'aria-valuenow',
      '0'
    )

    // 10 of 25 ticks after the boot delay.
    advance(BOOT_MS + 400)

    expect(screen.getByText('loading agent index…')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: /Loading Open Agents/i })).toHaveAttribute(
      'aria-valuenow',
      '40'
    )
    expect(screen.queryByText(/\d+\.\d+%/)).not.toBeInTheDocument()
  })

  it('holds at 100%, reveals, then hands off after the exit fade', () => {
    const onFinish = vi.fn()
    render(<Preloader onFinish={onFinish} />)

    advance(BOOT_MS + PROGRESS_MS)

    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('agent index ready')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: /Loading Open Agents/i })).toHaveAttribute(
      'aria-valuenow',
      '100'
    )
    expect(onFinish).not.toHaveBeenCalled()

    advance(PROGRESS_HOLD_MS)

    expect(screen.getByRole('status')).toHaveTextContent('Open Agents ready')
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(onFinish).not.toHaveBeenCalled()

    advance(REVEAL_MS)
    expect(onFinish).not.toHaveBeenCalled()

    advance(EXIT_MS - 1)
    expect(onFinish).not.toHaveBeenCalled()

    advance(1)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('can be skipped with the button', () => {
    const onFinish = vi.fn()
    render(<Preloader onFinish={onFinish} />)

    fireEvent.click(screen.getByRole('button', { name: /Skip intro/i }))
    expect(screen.queryByRole('button', { name: /Skip intro/i })).not.toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: /Loading Open Agents/i, hidden: true })
    ).toBeInTheDocument()

    advance(EXIT_MS - 1)
    expect(onFinish).not.toHaveBeenCalled()

    advance(1)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('can be skipped with Escape', () => {
    const onFinish = vi.fn()
    render(<Preloader onFinish={onFinish} />)

    fireEvent.keyDown(window, { key: 'Escape' })
    advance(EXIT_MS)

    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('blocks app-level keyboard shortcuts only while the intro is open', () => {
    const shortcut = vi.fn()
    const { unmount } = render(<Preloader onFinish={vi.fn()} />)
    window.addEventListener('keydown', shortcut)

    fireEvent.keyDown(document.body, { key: '?' })
    expect(shortcut).not.toHaveBeenCalled()

    unmount()
    fireEvent.keyDown(document.body, { key: '?' })
    expect(shortcut).toHaveBeenCalledTimes(1)

    window.removeEventListener('keydown', shortcut)
  })

  it('hands off immediately when reduced motion is preferred', () => {
    mockMatchMedia(true)
    const onFinish = vi.fn()

    render(<Preloader onFinish={onFinish} />)

    expect(screen.queryByRole('button', { name: /Skip intro/i })).not.toBeInTheDocument()

    advance(1)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('uses the latest onFinish callback without restarting the timeline', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender } = render(<Preloader onFinish={first} />)

    advance(700)
    rerender(<Preloader onFinish={second} />)
    advance(TOTAL_MS - 700)

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('does not expose a duplicate heading or hidden decorative content', () => {
    render(<Preloader onFinish={vi.fn()} />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Loading Open Agents')
  })

  it('locks page scrolling only while it is mounted', () => {
    const { unmount } = render(<Preloader onFinish={vi.fn()} />)

    expect(document.documentElement).toHaveClass('preloader-active')

    unmount()

    expect(document.documentElement).not.toHaveClass('preloader-active')
  })

  it('completes exactly once under StrictMode', () => {
    const onFinish = vi.fn()
    render(
      <StrictMode>
        <Preloader onFinish={onFinish} />
      </StrictMode>
    )

    advance(TOTAL_MS)

    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
