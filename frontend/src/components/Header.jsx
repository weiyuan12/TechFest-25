export default function Header({user , signIn}){
    return (
        <div className='bg-gray-100 flex flex-col w-full h-1/8 border-b border-gray-200'>
            <div className='h-full items-center flex justify-between p-8'>
                <div className='flex align-center justify-center ml-8'>
                    <span className="text-blue-600 text-5xl font-bold">FactCheck</span>
                </div>
                <div>
                    <button onClick ={signIn} className="cursor-pointer">
                        <span className="text-blue-600 text-2xl font-bold mr-12">{user ? user : "Sign Up"}</span>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

