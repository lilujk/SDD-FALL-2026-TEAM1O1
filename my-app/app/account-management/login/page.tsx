export default function Login() {
  return (
      <div className="flex justify-center">

        <div className="flex w-150 flex-col overflow-hidden rounded-xl border border-gray-300 text-black my-10 mx-8">
          <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
            Account Log In
          </h1>
  
          <div>
            <div className="flex flex-col m-2 mb-5 px-2 mt-3">
              <p>Username</p>
              <input name="Username" type="text" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
            </div>
            
            <div className="flex flex-col m-2 mb-3 px-2">
              <p>Password</p>
              <input name="Password" type="password" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col m-2 mb-5 px-2">
                <p className="text-sm">Don't have an account? <a href="./signup" className="underline text-blue-600">Create one</a></p>
              </div>

              <div className="flex flex-row">
                <button className="bg-black text-white text-md rounded-sm py-1 px-2 ml-3 mb-5 mr-4 cursor-pointer">Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }