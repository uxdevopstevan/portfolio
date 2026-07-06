import { Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { getAdjacentProjects, getNavigationProjects, getProjectById } from '../lib/projectNav'
import { ProjectDetail } from '../components/Portfolio/ProjectDetail'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = getProjectById(projects, projectId)

  if (!project || project.hidden) {
    return <Navigate to="/" replace />
  }

  const navigationProjects = getNavigationProjects(projects)
  const { prev, next } = getAdjacentProjects(navigationProjects, projectId)

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />
}
