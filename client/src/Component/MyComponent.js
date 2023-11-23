import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual API endpoint
        const response = await fetch('http://localhost:3000/user');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const result = await response.json();

        // Update the state with the fetched data
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means the effect runs once after the initial render

  return (
    <div>
      <h1>Fetched Data</h1>
      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
};



export default MyComponent;
