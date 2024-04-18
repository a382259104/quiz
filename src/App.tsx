import { Navigate, Route, Routes } from 'react-router';
import Kanbas from './Kanbas/index';
import Labs from './Labs';
import HelloWorld from './Labs/a3/HelloWorld';
import { HashRouter, Link } from 'react-router-dom';
import QuizEdit from './Kanbas/Courses/Quiz/QuizEdit';
import TestQuizzes from './Quizzes_And_Questions/testquizzes';
import TestQuestions from './Quizzes_And_Questions/testquestions';
import QuizPreview from './Kanbas/Courses/Quizzes/preview';
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
                    <Route path="/testquizzes"    element={<TestQuizzes/>}/>
                    <Route path="/testquestions"    element={<TestQuestions/>}/>
                    <Route path="/quizpreview"    element={<QuizPreview/>}/>
                </Routes>

                </div>
                
        
            </HashRouter>
           
   );
}
export default App;