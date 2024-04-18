import { Navigate, Route, Routes } from 'react-router';
import Kanbas from './Kanbas/index';
import Labs from './Labs';
import HelloWorld from './Labs/a3/HelloWorld';
import { HashRouter, Link } from 'react-router-dom';
import TestPage from './Quizzes_And_Questions/testPage';
function App() {

    const currentScreen = "home";

   return (
            <HashRouter>
                <div>
                <Routes>
                    <Route path="/"         element={<Navigate to="/Labs/a4"/>}/>
                    <Route path="/Labs/*"   element={<Labs/>}/>
                    <Route path="/Kanbas/*" element={<Kanbas/>}/>
                    <Route path="/hello"    element={<HelloWorld/>}/>
                    <Route path="/test"    element={<TestPage/>}/>
                </Routes>

                </div>
                
        
            </HashRouter>
           
   );
}
export default App;