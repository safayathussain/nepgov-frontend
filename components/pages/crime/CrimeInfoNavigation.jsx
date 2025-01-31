import React from "react";

const CrimeInfoNavigation = ({index}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y mb-8">
      <div className={` ${index !== 2 ? 'bg-white': 'bg-primary text-white'} flex items-center justify-center text-center leading-tight  py-3 px-2`}>
        <h2 className="text-lg">The Crime or Incident</h2>
      </div>
      <div className={` ${index !== 3 ? 'bg-white': 'bg-primary text-white'} flex items-center justify-center text-center leading-tight  py-3 px-2`}>
        <h2 className="text-lg">The person(s) responsible for the Crime</h2>
      </div>
      <div className={` ${index !== 4 ? 'bg-white': 'bg-primary text-white'} flex items-center justify-center text-center leading-tight  py-3 px-2`}>
        <h2 className="text-lg">Extra Info</h2>
      </div>
    </div>
  );
};

export default CrimeInfoNavigation;
