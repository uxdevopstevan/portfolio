export function getVisibleProjects(projects) {
  return projects.filter((project) => !project.hidden)
}

export function getProjectsByCollection(projects, collection) {
  return getVisibleProjects(projects).filter((project) => project.collection === collection)
}

/** Featured products first, then case studies — matches homepage order for footer nav. */
export function getNavigationProjects(projects) {
  const visible = getVisibleProjects(projects)
  const featured = visible.filter((project) => project.collection === 'featured-product')
  const caseStudies = visible.filter((project) => project.collection === 'case-study')
  const other = visible.filter(
    (project) => project.collection !== 'featured-product' && project.collection !== 'case-study',
  )
  return [...featured, ...caseStudies, ...other]
}

export function getProjectById(projects, id) {
  return projects.find((project) => project.id === id) ?? null
}

export function getProjectIndex(projects, id) {
  return projects.findIndex((project) => project.id === id)
}

export function getAdjacentProjects(projects, id) {
  const index = getProjectIndex(projects, id)
  if (index < 0) return { prev: null, next: null, index: -1 }

  const len = projects.length
  if (len <= 1) {
    return { index, prev: null, next: null }
  }

  return {
    index,
    prev: index > 0 ? projects[index - 1] : null,
    next: index < len - 1 ? projects[index + 1] : null,
  }
}
