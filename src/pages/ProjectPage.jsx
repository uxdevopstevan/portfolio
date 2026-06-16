import { Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { getAdjacentProjects, getProjectById } from '../lib/projectNav'
import { ProjectDetail } from '../components/Portfolio/ProjectDetail'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = getProjectById(projects, projectId)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const { prev, next } = getAdjacentProjects(projects, projectId)

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />
}
