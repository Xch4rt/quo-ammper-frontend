import React from 'react';

// Table Component
export const Table = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`
        w-full 
        text-sm 
        text-left 
        text-gray-500 
        border 
        border-gray-200 
        ${className}
      `}>
        {children}
      </table>
    </div>
  );
};

// Table Header Component
export const TableHeader = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <thead className={`
      text-xs 
      text-gray-700 
      uppercase 
      bg-gray-100 
      border-b 
      border-gray-200 
      ${className}
    `}>
      {children}
    </thead>
  );
};

// Table Body Component
export const TableBody = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <tbody className={`${className}`}>
      {children}
    </tbody>
  );
};

// Table Row Component
export const TableRow = ({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode, 
  className?: string,
  onClick?: () => void 
}) => {
  return (
    <tr 
      className={`
        border-b 
        border-gray-200 
        hover:bg-gray-50 
        transition-colors 
        duration-200 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

// Table Head (TH) Component
export const TableHead = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <th 
      scope="col" 
      className={`
        px-4 
        py-3 
        font-medium 
        text-gray-600 
        tracking-wider 
        ${className}
      `}
    >
      {children}
    </th>
  );
};

// Table Cell (TD) Component
export const TableCell = ({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode, 
  className?: string,
  onClick?: () => void 
}) => {
  return (
    <td 
      className={`
        px-4 
        py-3 
        text-gray-900 
        ${onClick ? 'cursor-pointer hover:text-blue-600' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </td>
  );
};