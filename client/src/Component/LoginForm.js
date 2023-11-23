import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    const [apiResponse, setApiResponse] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const callAPI = async () => {
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.text();
            const NewPage = ()=>{
                return (
                    <div>
                       <header>
                        <h1>Welcome to our Page!!!</h1>
                        <a href='https://hapi.dev/tutorials/validation/?lang=en_US'>Click me!!!</a>
                       </header>
                    </div>
                )
            }
            setApiResponse(NewPage);
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <div>
            <h2>Registration</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={callAPI}>
                    Register
                </button>
                
                
            </form>
            {apiResponse}
        </div>
    );
};

export default LoginForm;

// import React, { useState, useEffect } from 'react';

// const LoginForm = () => {
//     const [apiResponse, setApiResponse] = useState("");
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const callAPI = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username,
//                     password,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const result = await response.text();
//             setApiResponse(result.JSON.stringify());
//             // console.log(result);
//             // console.log(setApiResponse(result));
//         } catch (error) {
//             console.error('Error during registration:', error.message);
//         }
//     };

//     useEffect(() => {
//         callAPI();
//     }, []);

//     return (
//         <div>
//             <h2>Registration</h2>
//             <form>
//                 <label>
//                     Username:
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Password:
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </label>
//                 <br />
//                 <button type="button" onClick={callAPI}>
//                     Register
//                 </button>
//                 <p>{apiResponse}</p>
//                 <p>{apiResponse.message}</p>
//                 {apiResponse.user && (
//                     <p>{"Welcome " + apiResponse.user.username + "!!!"}</p>
//                 )}

//             </form>
//         </div>
//     );
// };

// export default LoginForm;
