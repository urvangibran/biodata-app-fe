import { ListMahasiswa } from './components';

function App() {
  return (
    <div className='flex justify-center items-start h-screen bg-gray-100'>
      <div className='mt-10 p-6 bg-white rounded-xl shadow-md'>
        <h1 className='text-4xl font-bold text-center mb-3 mt-0 font-serif'>Data Mahasiswa</h1>
        <ListMahasiswa />
      </div>
    </div>
  );
}

export default App;
