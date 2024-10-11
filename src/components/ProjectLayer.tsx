import React, { useState } from 'react';
import { FolderPlus, ChevronDown, ChevronUp } from 'lucide-react';
import AssignmentLayer from './AssignmentLayer';

interface Project {
  id: number;
  name: string;
  assignments: any[];
}

interface ProjectLayerProps {
  projects: Project[];
  onCreateProject: (name: string) => void;
  onCreateAssignment: (projectId: number, name: string) => void;
  onCreateIssue: (projectId: number, assignmentId: number, name: string) => void;
  onAddSolution: (projectId: number, assignmentId: number, issueId: number, name: string) => void;
}

const ProjectLayer: React.FC<ProjectLayerProps> = ({ 
  projects, 
  onCreateProject, 
  onCreateAssignment,
  onCreateIssue,
  onAddSolution
}) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
    }
  };

  const toggleProject = (projectId: number) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Enter project name"
          className="bg-gray-700 text-white px-4 py-2 rounded-l flex-grow"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
          <FolderPlus className="mr-2" size={16} />
          Create Project
        </button>
      </form>
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleProject(project.id)}
          >
            <h2 className="text-xl font-bold">{project.name}</h2>
            {expandedProjects.includes(project.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {expandedProjects.includes(project.id) && (
            <div className="p-4 bg-gray-700">
              <AssignmentLayer
                projectId={project.id}
                assignments={project.assignments}
                onCreateAssignment={(name) => onCreateAssignment(project.id, name)}
                onCreateIssue={(assignmentId, name) => onCreateIssue(project.id, assignmentId, name)}
                onAddSolution={(assignmentId, issueId, name) => onAddSolution(project.id, assignmentId, issueId, name)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectLayer;