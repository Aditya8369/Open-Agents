import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkipToMainContentLink, { MAIN_CONTENT_ID } from './SkipToMainContentLink'

describe('SkipToMainContentLink', () => {
  it('links to the main content landmark and is keyboard discoverable', () => {
    render(
      <>
        <SkipToMainContentLink />
        <main id={MAIN_CONTENT_ID} tabIndex={-1}>
          Page body
        </main>
      </>
    )

    const skipLink = screen.getByRole('link', { name: /skip to main content/i })
    expect(skipLink).toHaveAttribute('href', `#${MAIN_CONTENT_ID}`)
    expect(document.getElementById(MAIN_CONTENT_ID)).toHaveAttribute('tabindex', '-1')
  })
})
