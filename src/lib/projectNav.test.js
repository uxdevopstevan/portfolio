import { describe, expect, it } from 'vitest'
import {
  getAdjacentProjects,
  getNavigationProjects,
  getProjectById,
  getProjectIndex,
  getProjectsByCollection,
  getVisibleProjects,
} from './projectNav'

const projects = [
  { id: 'dbr', title: 'DBR', collection: 'featured-product' },
  { id: 'a2vg', title: 'A2VG', collection: 'featured-product', hidden: true },
  { id: 'hidden-product', title: 'Hidden', collection: 'featured-product', hidden: true },
  { id: 'farmers', title: 'Farmers Weekly', collection: 'case-study' },
  { id: 'legacy', title: 'Legacy', collection: 'other', hidden: true },
  { id: 'misc', title: 'Misc' },
]

describe('getVisibleProjects', () => {
  it('excludes hidden projects', () => {
    expect(getVisibleProjects(projects).map((p) => p.id)).toEqual(['dbr', 'a2vg', 'farmers', 'misc'])
  })
})

describe('getProjectsByCollection', () => {
  it('returns only visible projects in the collection', () => {
    expect(getProjectsByCollection(projects, 'featured-product').map((p) => p.id)).toEqual([
      'dbr',
      'a2vg',
    ])
    expect(getProjectsByCollection(projects, 'case-study').map((p) => p.id)).toEqual(['farmers'])
  })
})

describe('getNavigationProjects', () => {
  it('orders featured products, then case studies, then other visible projects', () => {
    expect(getNavigationProjects(projects).map((p) => p.id)).toEqual([
      'dbr',
      'a2vg',
      'farmers',
      'misc',
    ])
  })
})

describe('getProjectById', () => {
  it('returns the matching project or null', () => {
    expect(getProjectById(projects, 'a2vg')?.title).toBe('A2VG')
    expect(getProjectById(projects, 'missing')).toBeNull()
  })
})

describe('getProjectIndex', () => {
  it('returns the index or -1 when missing', () => {
    expect(getProjectIndex(projects, 'farmers')).toBe(3)
    expect(getProjectIndex(projects, 'missing')).toBe(-1)
  })
})

describe('getAdjacentProjects', () => {
  const nav = getNavigationProjects(projects)

  it('returns null neighbours for an unknown id', () => {
    expect(getAdjacentProjects(nav, 'missing')).toEqual({
      prev: null,
      next: null,
      index: -1,
    })
  })

  it('returns null neighbours when only one project is navigable', () => {
    expect(getAdjacentProjects([{ id: 'only' }], 'only')).toEqual({
      index: 0,
      prev: null,
      next: null,
    })
  })

  it('uses linear prev/next without wrapping', () => {
    expect(getAdjacentProjects(nav, 'dbr')).toMatchObject({
      index: 0,
      prev: null,
      next: { id: 'a2vg' },
    })
    expect(getAdjacentProjects(nav, 'a2vg')).toMatchObject({
      index: 1,
      prev: { id: 'dbr' },
      next: { id: 'farmers' },
    })
    expect(getAdjacentProjects(nav, 'misc')).toMatchObject({
      index: 3,
      prev: { id: 'farmers' },
      next: null,
    })
  })
})
