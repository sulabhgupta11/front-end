import Image from 'next/image'
import Logo from './../public/CrackDeal.png'
import Cart from './../public/cart.png'

import { Link } from '../components/Link';
import { userService } from '../services/user.service';
export default TopBar;

function TopBar() {
    return (
        <>
            <nav id="topbar" className="navbar navbar-expand-sm navbar-light border-bottom">
                <div style={{ width: "100px", marginLeft: "20px" }}>
                    <Image
                        src={Logo}
                        alt="Crack Deal"
                        width={50}
                        height={50}
                        className="logo"
                    />
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarColor"
                    aria-controls="navbarColor"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{ fontWeight: "bold" }} className="collapse navbar-collapse" id="navbarColor">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#">Mobiles</a> </li>
                        <li className="nav-item"><a className="nav-link" href="#">Laptops</a> </li>
                        <li className="nav-item "><a className="nav-link" href="#">Tablets</a> </li>
                        <li className="nav-item "><a className="nav-link" href="#">Headphones</a> </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav " style={{ marginLeft: "0" }}>
                        <li className="nav-item">
                            <a href="#!" style={{ lineHeight: "1rem" }} className="nav-link navbar-link-2 waves-effect">
                                <span className="badge badge-pill red">Cart</span>
                                <i className="fas fa-shopping-cart pl-0 pr-2"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link style={{ color: "skyblue", lineHeight: "26px", fontWeight: "bold", fontSize: "13px" }} href="/" className="btn btn-link">Home</Link>

                            <span><a onClick={() => userService.logout()} style={{ textDecoration: "underline", color: "skyblue", lineHeight: "22px", fontWeight: "bold", fontSize: "13px" }} className="white" href="#">Logout</a></span>
                        </li>

                    </ul>

                </div>
            </nav>
        </>
    );
}