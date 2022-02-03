import { useState,useEffect } from 'react';
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import Image from 'next/image';



function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

    return (
      <>
    <div className="flex flex-col items-center space-y-10 pt-48">
    
    
    <img className=' rounded-full w-40 bg-[#1d9bf0] object-contain ' src='https://rb.gy/ogau5a' alt=""
    
      />
       <p className="relative  border-inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all text-black ">Twitter SignUp</p>
      
   
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button  className="relative  border-inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all text-white bg-[#1d9bf0]  hover:bg-[#1d9bf0] group  rounded-full "
              onClick={() => {
                SignIntoProvider(provider.id, {callbackUrl:'/'});
              }}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
       
        
    </div>

      </>
      
    );
  }

  export async function getServerSideProps(context) {
    const providers = await getProviders();
  
    return {
      props: {
        providers,
      },
    };
  }


  
  export default SignIn;