import "../styles/header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../context/stateProvider";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const username = user?.displayName.split(" ")[0];

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div className="header flex-spaceBetween">
      <div className="header__left flex-center">
        <div className="header__icon header__icon--active">
          <HomeIcon />
          <p>Home</p>
        </div>
        <div className="header__icon">
          <FlashOnIcon />
          <p>Trending</p>
        </div>
        <div className="header__icon">
          <LiveTvIcon />
          <p>Verified</p>
        </div>
        <div className="header__icon">
          <VideoLibraryIcon />
          <p>Collections</p>
        </div>

        <div className="header__icon">
          <SearchIcon />
          <p>Search</p>
        </div>
        <div className="header__icon">
          <Avatar className="header__avatar" src={user?.photoURL} />
          <p>{username}</p>
        </div>
        <p className="header__logout" onClick={handleLogout}>
          Log out
        </p>
      </div>
      <img
        src="https://press.hulu.com/wp-content/uploads/2020/02/hulu-white.png"
        alt="logo"
      />
    </div>
  );
};

export default Header;
