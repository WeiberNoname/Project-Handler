import React, { useState } from 'react';
import { FileQuestion, ChevronDown, ChevronUp } from 'lucide-react';
import IssueLayer from './IssueLayer';

interface Assignment {
  id: number;
  name: string;
  issues: any[];
}

interface AssignmentLayerProps {
  projectId: number;
  assignments: Assignment[];
  onCreateAssignment: (name: string) => void;
  onCreateIssue: (assignmentId: number, name: string) => void;
  onAddSolution: (assignmentId: number, issueId: number, name: string) => void;
}

const AssignmentLayer: React.FC<AssignmentLayerProps> = ({ 
  assignments, 
  onCreateAssignment,
  onCreateIssue,
  onAddSolution
}) => {
  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [expandedAssignments, setExpandedAssignments] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssignmentName.trim()) {
      onCreateAssignment(newAssignmentName.trim());
      setNewAssignmentName('');
    }
  };

  const toggleAssignment = (assignmentId: number) => {
    setExpandedAssignments(prev =>
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newAssignmentName}
          onChange={(e) => setNewAssignmentName(e.target.value)}
          placeholder="Enter assignment name"
          className="input flex-grow"
        />
        <button type="submit" className="btn btn-primary rounded-l-none">
          <FileQuestion className="mr-2" size={14} />
          Create Assignment
        </button>
      </form>
      {assignments.map((assignment) => (
        <div key={assignment.id} className="bg-layer-3 rounded-lg overflow-hidden">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleAssignment(assignment.id)}
          >
            <h3 className="text-lg font-semibold">{assignment.name}</h3>
            {expandedAssignments.includes(assignment.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {expandedAssignments.includes(assignment.id) && (
            <div className="p-4 bg-layer-4">
              <IssueLayer
                assignmentId={assignment.id}
                issues={assignment.issues}
                onCreateIssue={(name) => onCreateIssue(assignment.id, name)}
                onAddSolution={(issueId, name) => onAddSolution(assignment.id, issueId, name)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentLayer;