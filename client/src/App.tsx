// export default App
import { BrowserRouter as Router } from "react-router-dom";

// ============ Routes =========================
import AppRoutes from "App.routes";


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
