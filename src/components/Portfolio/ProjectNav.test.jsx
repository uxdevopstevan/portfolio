import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProjectNav } from './ProjectNav'

function renderNav(props) {
  return render(
    <MemoryRouter>
      <ProjectNav {...props} />
    </MemoryRouter>,
  )
}

describe('ProjectNav', () => {
  it('renders nothing when both neighbours are missing', () => {
    const { container } = renderNav({ prevProject: null, nextProject: null })
    expect(container).toBeEmptyDOMElement()
  })

  it('renders previous and next links when both are present', () => {
    renderNav({
      prevProject: { id: 'dbr', title: 'DBR Protocol' },
      nextProject: { id: 'farmers', title: 'Farmers Weekly' },
    })

    expect(screen.getByRole('link', { name: /previous.*dbr protocol/i })).toHaveAttribute(
      'href',
      '/projects/dbr',
    )
    expect(screen.getByRole('link', { name: /next.*farmers weekly/i })).toHaveAttribute(
      'href',
      '/projects/farmers',
    )
  })

  it('renders only the next link at the start of the list', () => {
    renderNav({
      prevProject: null,
      nextProject: { id: 'a2vg', title: 'A2VG' },
    })

    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next.*a2vg/i })).toBeInTheDocument()
  })
})
