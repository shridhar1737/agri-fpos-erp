
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to Dashboard for simplicity
  return <Navigate to="/" replace />;
};

export default Index;
