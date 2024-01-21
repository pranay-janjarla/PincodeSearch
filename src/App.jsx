import { useState, useEffect } from 'react';

const Greetings = () => {
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const fetchPostoffices = async () => {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data && data[0]?.PostOffice[0]) {
          setDistrict(data[0].PostOffice[0].District);
          setState(data[0].PostOffice[0].State);
        } else {
          // Handle the case where the data structure is not as expected
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (pincode.length === 6) {
      fetchPostoffices();
    }
  }, [pincode]);

  return (
    <>
      <input
        value={pincode}
        onChange={(e) => {
          setPincode(e.target.value);
        }}
        placeholder="Pincode"
        className="border border-gray-800 rounded p-2 shadow"
      />
      <input
        value={district}
        placeholder={`District: ${district}`}
        className="border border-gray-800 rounded p-2 shadow"
        readOnly // Make this input read-only to prevent manual changes
      />
      <input
        value={state}
        placeholder={`State: ${state}`}
        className="border border-gray-800 rounded p-2 shadow"
        readOnly // Make this input read-only to prevent manual changes
      />
    </>
  );
};

const App = () => {
  return (
    
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    
    <h1>Search Pincodes</h1>
      <Greetings />
    </div>
  );
}
export default App;
