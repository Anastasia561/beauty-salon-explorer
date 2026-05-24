import Missing from "./pages/Missing.jsx";
import {Route, Routes} from "react-router-dom";
import Providers from "./context/Providers.jsx";
import Layout from "./layout/Layout.jsx";
import SalonList from "./pages/SalonList.jsx";
import SalonDetail from "./pages/SalonDetail.jsx";

function App() {

    return (
        <Providers>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<SalonList/>}/>
                    <Route path="*" element={<Missing/>}/>
                    <Route path="/salons/:id" element={<SalonDetail />} />
                </Route>
            </Routes>
        </Providers>
    )
}

export default App;