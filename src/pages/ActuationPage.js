import React, { useState, useEffect } from 'react';
import circuit from '../images/circuit.png';
import { GiWaterTower, GiValve } from "react-icons/gi";
import { MdOutlineInbox } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import axios from 'axios';
import InstructionBox from '../components/InstructionBox/InstructionBox';
import Motor from '../images/Motor.png';
import WaterQualityNode from '../images/wqn.png';
import Circuit2 from '../images/final.png';
import NavigationBar from '../components/Navigation/Navigation';


function ActuationPage() {
  let backendAPI =  "http://smartcitylivinglab.iiit.ac.in:7890"
  const [isOn, setIsOn] = useState({
    valve1: true,
    valve2: false,
    valve3: true,
    valve4: false,
  });

  const [motorRunning, setMotorRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeData, setNodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedNode, setHighlightedNode] = useState(null);

  const [units, setUnits] = useState({
    Temperature: "°C",
    Uncompensated_TDS: "ppm",
    Compensated_TDS: "ppm",
    Voltage_TDS: "V",
  });

  useEffect(() => {
    console.log(`${isOn.valve1 ? 0 : 1},${isOn.valve3 ? 0 : 1}`);
    sendArrayToBackend(); // Call the function to send the array whenever values change
  }, [isOn.valve1, isOn.valve3]);

  const toggleIsOn = (valve) => {
    setIsOn((prevState) => ({ ...prevState, [valve]: !prevState[valve] }));
  };

  const sendArrayToBackend = async () => {
    try {
      // Dynamically generate array based on the state of valve1 and valve3
      const arrayToSend = [isOn.valve1 ? 0 : 1, isOn.valve3 ? 0 : 1];

      const response = await axios.post(`${backendAPI}/actuation`, { array: arrayToSend });
      console.log('Array sent to backend:', arrayToSend);
    } catch (error) {
      console.error('Error sending array to backend:', error);
    }
  };

  const toggleMotor = async (state) => {
    setMotorRunning(state);
    const url = state
      ? 'https://smartcitylivinglab.iiit.ac.in/zf-backend-api/motor/actuation/1'
      : 'https://smartcitylivinglab.iiit.ac.in/zf-backend-api/motor/actuation/0';

    try {
      const response = await axios.post(url);
      console.log(`Motor ${state ? 'On' : 'Off'} request sent`);
    } catch (error) {
      console.error('Error sending motor request:', error);
    }
  };

  const handleNodeClick = (nodeName) => {
    setSelectedNode(nodeName);
    setHighlightedNode(nodeName);
    fetchNodeData(nodeName);
  };

  const fetchNodeData = async (nodeName) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendAPI}/data/${nodeName}`);
      const data = response.data;
      const dataArray = Object.entries(data).map(([key, value]) => ({
        parameter: key,
        value: value,
        units: units[key] || '',
      }));
      console.log(dataArray)
      console.log(data)
      setNodeData(dataArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching node data:', error);
      setLoading(false);
    }
  };

  // Define the inline styles for the spinning animation
  const spinningStyle = {
    animation: 'spin 2s linear infinite',
  };

  // Define the keyframes for spinning animation
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={{ overflowY: 'hidden', height: '47vw' }}>
      <NavigationBar />
      <div style={{ position: 'relative' }}>
        <img src={Circuit2} alt="circuit" style={{ width: '100%', marginTop: '55px' }} />
        {/* Motor Image and Buttons */}
        <div style={{ position: 'relative' }}>
      <style>
        {keyframes}
      </style>
      <img
        src={Motor}
        alt="Motor"
        style={{
          width: '4%',
          cursor: 'pointer',
          position: 'relative',
          top: '-9vw',
          left: '17%',
          transform: "scaleX(-1)",
          ...(motorRunning ? spinningStyle : {}),
        }}
      />
      <div style={{ position: 'absolute', top: '-13vw', left: '15%' }}>
        <button onClick={() => toggleMotor(true)}>On</button>
        <button onClick={() => toggleMotor(false)}>Off</button>
      </div>
    </div>
        {/* Valves and Tanks */}
        <GiValve
          size={40}
          color={isOn.valve1 ? 'green' : 'red'}
          style={{ position: 'absolute', top: '59%', left: '45%' }}
          onClick={() => {
            toggleIsOn('valve1');
            toggleIsOn('valve2');
          }}
        />
        <GiValve
          size={40}
          color={isOn.valve2 ? 'green' : 'red'}
          style={{ position: 'absolute', top:'45.5%', left: '36%', transform: 'rotate(90deg)' }}
          onClick={() => {
            toggleIsOn('valve2');
            toggleIsOn('valve1');
          }}
        />
        <GiValve
          size={40}
          color={isOn.valve2 ? 'green' : 'red'}
          style={{ position: 'absolute', top: '45%', left: '57.5%', transform: 'rotate(270deg)' }}
          onClick={() => {
            toggleIsOn('valve2');
            toggleIsOn('valve1');
          }}
        />
        <FaBoxArchive size={40} color="brown" style={{ position: 'absolute', top: '15%', left: '46%' }} />
        <div style={{ position: 'absolute', top: '28%', left: '45.5%', textAlign: 'center' }}>
          <div>Soil tank</div>
        </div>
        <GiValve
          size={40}
          color={isOn.valve3 ? 'green' : 'red'}
          style={{ position: 'absolute', top: '60%', left: '76%' }}
          onClick={() => {
            toggleIsOn('valve3');
            toggleIsOn('valve4');
          }}
        />
        <GiValve
          size={40}
          color={isOn.valve4 ? 'green' : 'red'}
          style={{ position: 'absolute', top: '45%', left: '66.4%', transform: 'rotate(90deg)' }}
          onClick={() => {
            toggleIsOn('valve4');
            toggleIsOn('valve3');
          }}
        />
        <GiValve
          size={40}
          color={isOn.valve4 ? 'green' : 'red'}
          style={{ position: 'absolute', top: '45%', left: '88%', transform: 'rotate(270deg)' }}
          onClick={() => {
            toggleIsOn('valve4');
            toggleIsOn('valve3');
          }}
        />
        <FaBoxArchive size={40} color="orange" style={{ position: 'absolute', top: '14.8%', left: '77%' }} />
        <div style={{ position: 'absolute', top: '28%', left: '76.5%', textAlign: 'center' }}>
          <div>Sand tank</div>
        </div>

        <GiWaterTower size={150} color="darkblue" style={{ position: 'absolute', top: '45.2%', left: '2.5%', height: '10.5vw' }} />

        {/* Nodes with Click Handlers */}
       {/* Node 1 */}
      <div
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: '58%',
          left: '26%',
          border: highlightedNode === 'Node-1' ? '4px solid yellow' : 'none',
          width: '50px',
          height: '50px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={WaterQualityNode}
          alt="Water Quality Node"
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={() => handleNodeClick('Node-1')}
        />
      </div>

        
         {/* Node 2 */}
      <div
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: '58%',
          left: '61.5%',
          border: highlightedNode === 'Node-2' ? '4px solid yellow' : 'none',
          width: '50px',
          height: '50px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={WaterQualityNode}
          alt="Water Quality Node"
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={() => handleNodeClick('Node-2')}
        />
      </div>
         {/* Node 3 */}
      <div
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: '58%',
          left: '92%',
          border: highlightedNode === 'Node-3' ? '4px solid yellow' : 'none',
          width: '50px',
          height: '50px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={WaterQualityNode}
          alt="Water Quality Node"
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={() => handleNodeClick('Node-3')}
        />
      </div>

        <div style={{ position: 'absolute', top: '74%', left: '26%', textAlign: 'center' }}>
        <div>Node 1</div>
        </div>
        <div style={{ position: 'absolute', top: '74%', left: '61.5%', textAlign: 'center' }}>
          <div>Node 2</div>
        </div>
        <div style={{ position: 'absolute', top: '74%', left: '92%', textAlign: 'center' }}>
          <div>Node 3</div>
        </div>
      </div>

      {/* Container for Node Data Table, InstructionBox, and Icons and Description table */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px', padding: '0 0vw', marginLeft: '2vw' }}>
        
        {/* Node Data Table */}
        <div style={{ flex: 2, marginRight: '10px', width: '50vw', marginTop: '-30px', }}>
          <h2> {selectedNode && `  ${selectedNode}`}</h2>
          <div style={{ maxHeight: '30vw' }}>
            {loading ? (
              <p>Loading data...</p>
            ) : nodeData.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ display: 'table', width: '100%',height: '3vw', tableLayout: 'fixed' }}>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Parameter</th>
                    <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Value</th>
                    <th style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'left' }}>Units</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    display: 'block',
                    width: '100%',
                    overflowY: 'auto',
                    maxHeight: '28vw',
                    tableLayout: 'fixed',
                  }}
                >
                  {nodeData.map((row, index) => (
                    <tr
                      key={index}
                      style={{
                        display: 'table',
                        width: '99.8%',
                        height: '2.5vw',
                        tableLayout: 'fixed',
                      }}
                    >
                      <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.parameter}</td>
                      <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.value}</td>
                      <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Please select a node to view data.</p>
            )}
          </div>
        </div>

       {/* InstructionBox */}
        <div style={{ flex: 1, marginRight: '1px' }}>
          <InstructionBox />
        </div>

        {/* Icons and Description Table */}
        <div style={{ flex: 1 }}>
          <div style={{ marginTop: '0', width: '80%', overflowY: 'hidden' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Description</th>
                </tr>
              </thead>
            </table>
            <div
              style={{
                maxHeight: '13vw',
                overflowY: 'auto',
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For Internet Explorer and Edge
              }}
            >
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <GiWaterTower size={25} color="darkblue" />
                    </td>
                    <td>Water Source</td>
                  </tr>
                  <tr>
                    <td>
                      <hr
                        style={{
                          width: '30px',
                          borderTop: '1px solid black',
                          margin: '10px 0',
                        }}
                      />
                    </td>
                    <td>Pipe</td>
                  </tr>
                  <tr>
                    <td>
                      <GiValve size={25} color="green" />
                    </td>
                    <td>Solenoid Valve Turned On</td>
                  </tr>
                  <tr>
                    <td>
                      <GiValve size={25} color="red" />
                    </td>
                    <td>Solenoid Valve Turned Off</td>
                  </tr>
                  <tr>
                    <td>
                      <MdOutlineInbox size={25} color="black" />
                    </td>
                    <td>Water Quality Node</td>
                  </tr>
                  <tr>
                    <td>
                      <FaBoxArchive size={25} color="brown" />
                    </td>
                    <td>Soil Tank</td>
                  </tr>
                  <tr>
                    <td>
                      <FaBoxArchive size={25} color="orange" />
                    </td>
                    <td>Sand Tank</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        </div>

      </div>
   
  );
}

export default ActuationPage;

