import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface Solution {
  id: number;
  name: string;
}

interface SolutionLayerProps {
  issueId: number;
  solutions: Solution[];
  onAddSolution: (name: string) => void;
}

const SolutionLayer: React.FC<SolutionLayerProps> = ({ solutions, onAddSolution }) => {
  const [newSolutionName, setNewSolutionName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSolutionName.trim()) {
      onAddSolution(newSolutionName.trim());
      setNewSolutionName('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newSolutionName}
          onChange={(e) => setNewSolutionName(e.target.value)}
          placeholder="Enter solution name"
          className="input flex-grow"
        />
        <button type="submit" className="btn btn-primary rounded-l-none">
          <PlusCircle className="mr-2" size={14} />
          Add Solution
        </button>
      </form>
      <ul className="space-y-2">
        {solutions.map((solution) => (
          <li key={solution.id} className="bg-gray-600 p-2 rounded text-sm">
            {solution.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolutionLayer;