import './App.css'
import { Button } from "react-bootstrap";
import { Slide, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const notify = () => toast.success("Wow so easy !");
  return (
      <>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <Button onClick={notify}>Hello</Button>
          <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
          />
      </>
  );
}

export default App
