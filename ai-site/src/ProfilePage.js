import React, { useEffect } from 'react';
import './ProfilePage.css';
import { onAuthStateChanged, getAuth, signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        // Check authentication status when the component mounts
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setUsername(user.displayName || '');
          setProfilePicture(user.photoURL || '');
        });
    
        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
      }, [auth]);

    const handleSignOut = () => {
        signOut(auth);
    }

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: profilePicture,
            });
            // Reload the user data to reflect the changes
            const updatedUser = auth.currentUser;
            setUser(updatedUser);
            setUsername(updatedUser.displayName || '');
            setProfilePicture(updatedUser.photoURL || '');
            console.log('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    return (
        <div className='ProfilePage'>
            <div>
                {user ? ( // Check if the user is authenticated
                    <div>
                        <h1>Welcome, {username || user.email}!</h1>
                        <div className='main'> 

                            {profilePicture && (
                                <div className='profile-picture'>
                                    <img src={profilePicture} alt='Profile' />
                                </div>
                            )}

                            {!profilePicture && (
                            <div className='profile-picture'>
                                <img src='data:image/jpeg;base64,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' alt='Default Profile' />
                            </div>
                            )}

                            <div className='settings'>
                                <h2>Profile Settings</h2>
                                <div className='inputs'>

                                    <label>
                                        Username: <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </label>

                                    <label>
                                        Profile Picture URL: 
                                        <input
                                            type='text'
                                            value={profilePicture}
                                            onChange={(e) => setProfilePicture(e.target.value)}
                                        />
                                    </label>

                                </div>
                            </div>

                            <button onClick={handleSignOut} className='signOutButton'>Sign Out</button>
                        </div>

                        
                    </div>
                ) : (
                    <div>
                        <h1>Access Denied</h1>
                        <h2>Please sign up or login to get access to this page's features</h2>
                        {/* Additional content for non-logged-in users */}
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default ProfilePage;