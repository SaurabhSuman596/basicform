import React, { useEffect, useRef, useState } from 'react';
import { RiFileUploadLine } from 'react-icons/ri';
/*import useRandpic from '../../hooks/useRandPic';*/
import './Form.css';

const Form = () => {
  const [newPerson, setNewPerson] = useState({
    name: '',
    phone: '',
    photo: '',
  });
  const [allPeople, setAllPeople] = useState([]);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [photoValid, setPhotoValid] = useState(false);
  const [totalValidate, setTotalValidate] = useState(false);

  const setUpdatePerson = (newPerson, e) => ({
    ...newPerson,
    [e.target.name]: e.target.value,
  });

  const handleChange = (e) => {
    setTotalValidate(false);
    setNewPerson(setUpdatePerson(newPerson, e));
  };

  /*const urlLink = useRandpic();*/

  const handleFileClick = () => {
    setNewPerson({
      ...newPerson,
      ['photo']: 'https://picsum.photos/200/300',
    });
    setPhoneValid(true);
  };

  useEffect(() => {
    if (
      !newPerson.name ||
      typeof newPerson.name !== 'string' ||
      newPerson.name.length < 3
    ) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  }, [newPerson.name]);

  useEffect(() => {
    const number = newPerson.phone && Number(newPerson.phone);
    if (newPerson.phone.length === 10 && typeof number === 'number') {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  }, [newPerson.phone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneValid && photoValid && nameValid) {
      setAllPeople([...allPeople, newPerson]);
      localStorage.setItem('person', JSON.stringify(allPeople));
      setNewPerson((newPerson) => ({
        phone: '',
        name: '',
        photo: '',
      }));
      setTotalValidate(true);
    } else {
    }
  };

  useEffect(() => {
    if (newPerson.photo) {
      setPhotoValid(true);
    } else {
      setPhotoValid(false);
    }
  }, [newPerson.photo]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <p>
        {totalValidate ? (
          <p>Form Submitted Successfully'</p>
        ) : (
          <p className="notAll">please fill the form correctly</p>
        )}
      </p>
      <h2>Conference Registration Form</h2>
      <p className="formhead_design"></p>
      <div className="input__contain">
        <input
          name="name"
          type="text"
          value={newPerson.name}
          onChange={handleChange}
          placeholder="Name"
          className="inputBorder"
        />
        <p>{!nameValid && 'Enter a valid name'} </p>
      </div>
      <div className="input__contain">
        <input
          name="phone"
          type="number"
          onChange={handleChange}
          placeholder="Phone No"
          value={newPerson.phone}
          className="inputBorder"
        />
        <p>{!phoneValid && 'Enter a valid Phone no'} </p>
        <span>{newPerson.phone && newPerson.phone.toString().length}/10</span>
      </div>
      <div onClick={handleFileClick} className="input__Filecontain">
        {photoValid ? (
          <img src={'https://picsum.photos/200/300'} alt="" />
        ) : (
          <>
            <div className="picturecont">
              <RiFileUploadLine className="pictureIcon" />
              <p>Upload Profile Picture</p>
            </div>
            <p>{!photoValid && 'Pick a Picture'}</p>
          </>
        )}
      </div>
      <div
        className="
      buttonCont"
      >
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
