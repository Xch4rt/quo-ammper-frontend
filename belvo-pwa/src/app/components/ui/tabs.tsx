import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({ 
  children, 
  defaultValue, 
  onValueChange 
}: { 
  children: React.ReactNode, 
  defaultValue?: string,
  onValueChange?: (value: string) => void 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex border-b mb-4">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ 
  value, 
  children 
}: { 
  value: string, 
  children: React.ReactNode 
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`
        px-4 py-2 
        ${isActive 
          ? 'border-b-2 border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'}
      `}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ 
  value, 
  children 
}: { 
  value: string, 
  children: React.ReactNode 
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div>{children}</div>;
};

// components/ui/card.tsx
export const Card = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 border-b">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-xl font-semibold text-gray-800">
      {children}
    </h2>
  );
};

export const CardContent = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// components/ui/table.tsx
export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="bg-gray-100 border-b">
      {children}
    </thead>
  );
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};

export const TableRow = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <tr className={`border-b hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="px-4 py-3 font-medium text-gray-600">
      {children}
    </th>
  );
};

export const TableCell = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <td className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  );
};