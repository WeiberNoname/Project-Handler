import React, { useState } from 'react';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SolutionLayer from './SolutionLayer';

interface Issue {
  id: number;
  name: string;
  solutions: any[];
}

interface IssueLayerProps {
  assignmentId: number;
  issues: Issue[];
  onCreateIssue: (name: string) => void;
  onAddSolution: (issueId: number, name: string) => void;
}

const IssueLayer: React.FC<IssueLayerProps> = ({ 
  issues, 
  onCreateIssue,
  onAddSolution
}) => {
  const [newIssueName, setNewIssueName] = useState('');
  const [expandedIssues, setExpandedIssues] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIssueName.trim()) {
      onCreateIssue(newIssueName.trim());
      setNewIssueName('');
    }
  };

  const toggleIssue = (issueId: number) => {
    setExpandedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newIssueName}
          onChange={(e) => setNewIssueName(e.target.value)}
          placeholder="Enter issue name"
          className="input flex-grow"
        />
        <button type="submit" className="btn btn-primary rounded-l-none">
          <PlusCircle className="mr-2" size={14} />
          Create Issue
        </button>
      </form>
      {issues.map((issue) => (
        <div key={issue.id} className="bg-layer-4 rounded-lg overflow-hidden">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleIssue(issue.id)}
          >
            <h4 className="text-md font-medium">{issue.name}</h4>
            {expandedIssues.includes(issue.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {expandedIssues.includes(issue.id) && (
            <div className="p-4 bg-layer-5">
              <SolutionLayer
                issueId={issue.id}
                solutions={issue.solutions}
                onAddSolution={(name) => onAddSolution(issue.id, name)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IssueLayer;