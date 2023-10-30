import { useState } from 'react';

export const useUserState = () => {
  const [profilePicture, setProfilePicture] = useState("");

  return { profilePicture, setProfilePicture };
};