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
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#1d9bf0] rounded hover:bg-[#1d9bf0] group"
              onClick={() => {
                SignIntoProvider(provider.id);
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