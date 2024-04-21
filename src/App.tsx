import { Navigate, Route, Routes } from 'react-router';
import Kanbas from './Kanbas/index';
import { HashRouter, Link } from 'react-router-dom';
function App() {

    const currentScreen = "home";

   return (
            <HashRouter>
                <div>
                <Routes>
                    <Route path="/"         element={<Navigate to="/Kanbas"/>}/>
                    <Route path="/Kanbas/*" element={<Kanbas/>}/>
                </Routes>

                </div>
                
        
            </HashRouter>
           
   );
}
export default App;