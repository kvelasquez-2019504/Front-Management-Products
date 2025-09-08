import {useRoutes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {routes} from './routes';


export const App = ()=>{
  const elements = useRoutes(routes);
  return(
    <>
      {elements}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}