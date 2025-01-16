import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DecisionState } from './store';

export const saveToFile = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const loadFromFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const exportToPDF = (state: DecisionState) => {
  const { problemStatement, criteria, options } = state;
  const doc = new jsPDF();

  // Add problem statement
  doc.setFontSize(16);
  doc.text('Problem Statement', 14, 15);
  doc.setFontSize(12);
  doc.text(problemStatement, 14, 25, { maxWidth: 180 });

  // Add Criteria
  doc.setFontSize(16);
  doc.text('Criteria', 14, 40);
  doc.setFontSize(12);
  criteria.forEach((criterion, index) => {
    doc.text(
      `${criterion.name} - ${criterion.weight}%`,
      14,
      50 + index * 10,
      { maxWidth: 180 }
    );
  });

  // Add Options
  let optionsStartY = 50 + criteria.length * 10 + 10;
  doc.setFontSize(16);
  doc.text('Options', 14, optionsStartY);
  doc.setFontSize(12);
  options.forEach((option, index) => {
    doc.text(
      `${option.name}`,
      14,
      optionsStartY + 10 + index * 10,
      { maxWidth: 180 }
    );
  });

  // Calculate scores
  const calculateScore = (option: any) => {
    return criteria.reduce((total, criterion) => {
      const score = option.scores[criterion.id] || 0;
      return total + (score * criterion.weight) / 100;
    }, 0);
  };

  const sortedOptions = [...options].sort((a, b) => calculateScore(b) - calculateScore(a));

  // Add results table
  const tableData = sortedOptions.map((option) => [
    option.name,
    ...criteria.map((criterion) => option.scores[criterion.id] || 0),
    calculateScore(option).toFixed(2),
  ]);

  doc.autoTable({
    head: [
      ['Option', ...criteria.map((c) => `${c.name} (${c.weight}%)`), 'Total Score'],
    ],
    body: tableData,
    startY: optionsStartY + options.length * 10 + 20,
  });

  // Save the PDF
  doc.save('decision_results.pdf');
};
