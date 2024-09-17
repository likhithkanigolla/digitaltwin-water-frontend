import React, { useEffect, useState } from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import axios from 'axios';

const fetchData = async (setDescriptorsData, arr, nodeID) => {
  try {
    const url = "http://smartcitylivinglab.iiit.ac.in:7890/data/" + nodeID;
    const response = await axios.get(url);
    const descData = {};

    const con = response.data;
    // console.log('Backend response:', con);

    for (let i = 0; i < arr.length; i++) {
      descData[arr[i]] = con[arr[i]];
    }
    setDescriptorsData(descData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function CustomCircleMarker({ nodeData, setClickedNode }) {
  const { "Node Location": position, "Node ID": nodeID, "Data String Parameters": arr } = nodeData;
  const [descriptorsData, setDescriptorsData] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(setDescriptorsData, arr, nodeID);
    }, 1000);
    return () => clearInterval(interval); // Clear interval on unmount to prevent memory leaks
  }, [arr, nodeID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://smartcitylivinglab.iiit.ac.in:7890/real-time-location');
        const data = response.data;
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 3000); // Adjust the interval based on your requirements
    return () => clearInterval(intervalId); // Clear interval on unmount to prevent memory leaks
  }, []);

  return (
    <CircleMarker center={position} pathOptions={{ fillColor: 'blue' }} radius={5}
      eventHandlers={{
        click: () => {
          console.log(nodeData['Node ID']);
          setClickedNode(nodeData['Node ID']);
        }
      }}
    >
      <Popup>
        <b>{nodeID}</b> <br />
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        {arr.map((element, index) => (
          <p key={index}>{element} : {descriptorsData[element]}</p>
        ))}
      </Popup>
      <Tooltip>{nodeID}</Tooltip>
    </CircleMarker>
  );
}

export default CustomCircleMarker;