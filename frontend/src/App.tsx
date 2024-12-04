import './App.css'
import Button from './components/ui/Button'
import Plus from './components/ui/icons/Plus'

function App() {
 
  return (
    <>
      <Button varient='primary' startIcon={<Plus size='lg'/>} size='md' text="add content" onClick={()=>{}}/>
      <Button varient='secondary' size='lg' text="add content" onClick={()=>{}}/>
    </>
  )
}

export default App
