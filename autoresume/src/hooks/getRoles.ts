import { useState, useEffect } from 'react';
import { API_ENDOINTS } from '../constants';

const useGetRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch(API_ENDOINTS.GET_ROLES, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  return roles;
};

export default useGetRoles;
