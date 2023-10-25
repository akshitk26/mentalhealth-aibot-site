import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="AboutPage">
      <div class='main'>
        <div class='aboutBox'>
          <div className='reasonBox'>
            <div className='mainTitle'>
              <h1>Why Ami was created</h1>
            </div>

            <div className='mainInfo'>
              <p>
                The world of NLP and generative AI is ever growing, and we are experiencing its early breakthroughs right now. 
                This virtual 'being' is now being used for a multitude of purposes, and this app was created to add another purpose to that
                extensive list: mental health support. Various apps and sites already have AI impersonating different personalities and characteristics
                for entertainment, why not allow it to also act as a therapist or a friend? Mental health is often overlooked by individuals 
                who could be doing better themselves or by the people around them. Ami, named from the latin root word 'Amicus', meaning 'friend',
                aims to do exactly what its name implies - become your friend, no matter who you are.
              </p>
            </div>
          </div>
          
          <div className='purposeBox'>
            <div className='mainTitle2'>
              <h1>What Ami can do</h1>
            </div>

            <div className='mainInfo2'>
              <p>
                Ami can do many things. Ami can talk to you - as someone you need to vent to or as a friend, an equal - ask you questions, 
                share its experiences with you, and have fun with you! Say anything to Ami and you will be met with concern, care, and positivity
                every time. To start a conversation with Ami, simply click the 'Chat' button up top and start texting your new companion!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;