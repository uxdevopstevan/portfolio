import { Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { getAdjacentProjects, getProjectById, getVisibleProjects } from '../lib/projectNav'
import { ProjectDetail } from '../components/Portfolio/ProjectDetail'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = getProjectById(projects, projectId)

  if (!project || project.hidden) {
    return <Navigate to="/" replace />
  }

  const visibleProjects = getVisibleProjects(projects)
  const { prev, next } = getAdjacentProjects(visibleProjects, projectId)

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />
}
