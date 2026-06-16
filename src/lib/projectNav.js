export function getVisibleProjects(projects) {
  return projects.filter((project) => !project.hidden)
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
    prev: projects[(index - 1 + len) % len],
    next: projects[(index + 1) % len],
  }
}
