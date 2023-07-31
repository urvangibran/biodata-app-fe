import { ContactList } from './components'


function App() {
  return (
    <div className='flex justify-center items-center'>
      <div className='mt-10'>
        <h1 className='text-4xl font-bold text-center mb-3'>Data Mahasiswa</h1>
        {/* Jumlah mahasiswa */}
        <ContactList />
      </div>
    </div>
  );
}

export default App;
