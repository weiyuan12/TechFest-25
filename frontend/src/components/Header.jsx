import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Header(){
    return (
        <div className='bg-gray-100 flex flex-col w-full h-1/8 border-b border-gray-200'>
            <div className='h-full items-center flex justify-between p-8'>
                <div className='flex align-center justify-center ml-8'>
                    <span className="text-blue-600 text-5xl font-bold">FactCheck</span>
                </div>
                <div>
                <span className="text-blue-600 text-2xl font-bold mr-12">Signup</span>
                </div>
            </div>

        </div>
    )
}

