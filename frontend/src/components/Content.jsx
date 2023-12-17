import React from 'react';

const Content = ({ selectedPageContent }) => {
  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-xl font-semibold mt-4">Wiki Page Content</h2>
      <div
        className="mt-2 text-justify"
        dangerouslySetInnerHTML={{ __html: selectedPageContent }}
      />
    </div>
  );
};

export default Content;
