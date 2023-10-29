import React, { useEffect } from 'react';
import './ProfilePage.css';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Check authentication status when the component mounts
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
      }, [auth]);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <div className='ProfilePage'>
            <div>
                {user ? ( // Check if the user is authenticated
                    <div>
                        <h1>Welcome, {user.displayName || user.email}!</h1>
                        <button onClick={handleSignOut}>Sign Out</button>
                        {/* Additional content for logged-in users */}
                    </div>
                ) : (
                    <div>
                        <h1>Access Denied</h1>
                        <p>Please sign in or sign up to view this page.</p>
                        {/* Additional content for non-logged-in users */}
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default ProfilePage;