import React, { useEffect, useState } from 'react';
import './Person.css';

const Person = () => {
  const [peoples, setAllPeoples] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('person'));
    setAllPeoples(data);
  }, [peoples]);
  console.log(peoples);
  return (
    <div className="person">
      {peoples?.map((people, i) => (
        <>
          <div className="peopleCont" key={i}>
            <img src={people.photo} alt="" />
            <p>{people.name}</p>
            <p>{people.phone}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Person;
