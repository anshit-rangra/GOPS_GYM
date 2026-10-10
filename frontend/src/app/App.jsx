import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from '../routes'
import { bootstrapSessionThunk } from '../features/auth/state/authThunk'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bootstrapSessionThunk())
  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default App
