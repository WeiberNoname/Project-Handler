import React, { useState } from 'react';
import { Download, UploadCloud } from 'lucide-react';
import ProjectLayer from './components/ProjectLayer';

function App() {
  const [projects, setProjects] = useState([]);

  const handleCreateProject = (name) => {
    setProjects([...projects, { id: Date.now(), name, assignments: [] }]);
  };

  const handleCreateAssignment = (projectId, name) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, assignments: [...project.assignments, { id: Date.now(), name, issues: [] }] }
        : project
    ));
  };

  const handleCreateIssue = (projectId, assignmentId, name) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            assignments: project.assignments.map(assignment =>
              assignment.id === assignmentId
                ? { ...assignment, issues: [...assignment.issues, { id: Date.now(), name, solutions: [] }] }
                : assignment
            )
          }
        : project
    ));
  };

  const handleAddSolution = (projectId, assignmentId, issueId, name) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            assignments: project.assignments.map(assignment =>
              assignment.id === assignmentId
                ? {
                    ...assignment,
                    issues: assignment.issues.map(issue =>
                      issue.id === issueId
                        ? { ...issue, solutions: [...issue.solutions, { id: Date.now(), name }] }
                        : issue
                    )
                  }
                : assignment
            )
          }
        : project
    ));
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(projects, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReverse = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setProjects(data);
          alert('Data successfully loaded!');
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Error loading data. Please make sure you selected the correct file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="bg-gray-900 p-4">
        <div className="container mx-auto flex items-center">
          <h1 className="text-xl font-bold">NexusianFusion</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 flex-grow overflow-auto">
        <ProjectLayer 
          projects={projects} 
          onCreateProject={handleCreateProject}
          onCreateAssignment={handleCreateAssignment}
          onCreateIssue={handleCreateIssue}
          onAddSolution={handleAddSolution}
        />
      </main>
      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
            onClick={handleDownload}
          >
            <Download className="mr-2" size={16} />
            Download Project Data
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
            onClick={handleReverse}
          >
            <UploadCloud className="mr-2" size={16} />
            Upload Project Data
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;