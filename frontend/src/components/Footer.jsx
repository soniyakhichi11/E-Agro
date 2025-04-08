import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";

export const Footer=()=>{
    return(
        <>
        <main>
        <footer className="footer">
  <div className="container">
    <ul className="nav">
      <li className="nav-item"><NavLink to="#" className="nav-link px-2">Home</NavLink></li>
      <li className="nav-item"><NavLink to="#" className="nav-link px-2">Features</NavLink></li>
      <li className="nav-item"><NavLink to="#" className="nav-link px-2">Pricing</NavLink></li>
      <li className="nav-item"><NavLink to="#" className="nav-link px-2">FAQs</NavLink></li>
      <li className="nav-item"><NavLink to="#" className="nav-link px-2">About</NavLink></li>
    </ul>
    <p className="copyright">© 2024 Company, Inc</p>
  </div>
</footer>


        </main>
        </>
    );
}