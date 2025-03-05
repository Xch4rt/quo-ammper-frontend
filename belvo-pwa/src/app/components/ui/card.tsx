import React from 'react';

// Card Component
export const Card = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`
      bg-white 
      rounded-lg 
      shadow-md 
      border 
      border-gray-200 
      overflow-hidden 
      ${className}
    `}>
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`
      px-4 
      py-3 
      border-b 
      border-gray-200 
      bg-gray-50 
      ${className}
    `}>
      {children}
    </div>
  );
};

// Card Title Component
export const CardTitle = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <h3 className={`
      text-lg 
      font-semibold 
      text-gray-800 
      ${className}
    `}>
      {children}
    </h3>
  );
};

// Card Content Component
export const CardContent = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`
      p-4 
      ${className}
    `}>
      {children}
    </div>
  );
};

// Card Footer Component (Bonus)
export const CardFooter = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`
      px-4 
      py-3 
      bg-gray-50 
      border-t 
      border-gray-200 
      ${className}
    `}>
      {children}
    </div>
  );
};