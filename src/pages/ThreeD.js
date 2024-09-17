import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../components/Navigation/Navigation";
import axios from "axios";
import "./ThreeD.css";

const ThreeD = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isMotorOn, setIsMotorOn] = useState(false);

  // Ensure the video is loaded and paused on mount
  useEffect(() => {
    let data = 100 - 100;
    videoRef.current.currentTime = data; // Seek to 0 seconds
    videoRef.current.play();
    setTimeout(() => {
      if (videoRef.current) {
      videoRef.current.currentTime = 41.5; // Seek to 41 seconds
      videoRef.current.pause();
      console.log("Video paused at ", videoRef.current.currentTime);
      }
    }, 41600);
  }, []);

  const handleMotorOn = () => {
    setIsMotorOn(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 41.5; // Seek to 41.5 seconds
      videoRef.current.muted = true; // Mute the video for autoplay permission
      videoRef.current.play().catch((error) => {
        console.error("Autoplay error, user interaction needed:", error);
      });
    }

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 44; // Seek to 44s
        videoRef.current.pause();
      }
      axios.post("https://smartcitylivinglab.iiit.ac.in/zf-backend-api/motor/actuation/1").then(response => {
        console.log(response.status);
        
        if (audioRef.current && response.status === 200) {
          console.log("Audio on");
          setTimeout(() => {
          audioRef.current.loop = true;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }, 1000);
        }

      }).catch(error => {
          console.error("Error posting data:", error);
        });
    }, 2600); // 3.15s delay for the motor operation
  };

  const handleMotorOff = () => {
    setIsMotorOn(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 44; // Seek to 44s
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    setTimeout(() => {
      
      axios.post("https://smartcitylivinglab.iiit.ac.in/zf-backend-api/motor/actuation/0")
        .then(response => {
          console.log(response.status);
          if (audioRef.current && response.status === 200) {
            setTimeout(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; 
            console.log("Audio off");
            // Reset audio
            },1000);
          }
        })
        .catch(error => {
          console.error("Error posting data:", error);
        });
    }, 3000); // 3s delay to stop motor sound
  };

  return (
    <div>
      <NavigationBar />
      <div
        style={{
          marginTop: "70px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {/* Video element, autoplay handled manually */}
        <div
          style={{
            display: "flex",
            width: "250px",
            flexDirection: "column",
            background: "#123462",
          }}
        >
          <div className="btn" onClick={handleMotorOn}>
            Motor On
          </div>
          <div className="btn" onClick={handleMotorOff}>
            Motor Off
          </div>
        </div>
        <video
          className="video"
          ref={videoRef}
          src="/video/zf.mp4" // Ensure it's paused after metadata loads
          style={{ width: "90vw", height: "auto" }}
          disablePictureInPicture // Style the video properly
        />
        {/* Audio element */}
        <audio ref={audioRef} src="/audio/motor.mp3" />
        {/* Buttons for motor on/off */}
      </div>
    </div>
  );
};

export default ThreeD;
