import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

import dashboardIcon from '../../assets/Dashboard Icon/Vector.png';
import newIcon from '../../assets/Dashboard Icon/Group.png';
import manageIcon from '../../assets/Dashboard Icon/manage.png';
import manageNewHeadlineIcon from '../../assets/Dashboard Icon/manage-headline.png';
import manageNewarticleIcon from '../../assets/Dashboard Icon/manage-article.png';
import manageVideoIcon from '../../assets/Dashboard Icon/manage-video.png';
import profileIcon from '../../assets/Dashboard Icon/profile.png';
import setting from '../../assets/Dashboard Icon/setting.png';
import profile from '../../assets/searchBarIcon/Ellipse.png';
import logoutIcon from '../../assets/Dashboard Icon/logout.png';
import dropleft from '../../assets/Dashboard Icon/dropleft.png';
import dropdown from '../../assets/Dashboard Icon/dropdown.png';

const Sidebar = ({ view }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate('/sign-in');
  };

  const [dropManage, setDropManage] = useState(false);
  const [dropNew, setDropNew] = useState(false);

  const sidebarContent = (
    <>
      <Link to="/" className="hover:bg-[#FFAC06] flex items-center px-5 py-2 mt-4">
        <img src={dashboardIcon} alt="Dashboard" className="mr-4" />
        Dashboard
      </Link>

      <div
        className={`hover:bg-[#FFAC06] flex items-center justify-between px-5 py-2 mt-4 cursor-pointer ${
          dropNew ? 'bg-[#FFAC06]' : ''
        }`}
        onClick={() => setDropNew(!dropNew)}
      >
        <div className="flex items-center">
          <img src={newIcon} alt="New" className="mr-4" />
          New
        </div>
        <img src={dropNew ? dropdown : dropleft} alt="dropdown" />
      </div>

      {dropNew && (
        <div className="flex flex-col pl-10 text-sm">
          <Link to="/Post-New-Headline" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageNewHeadlineIcon} className="mr-3" alt="" />
            Post New Headline
          </Link>
          <Link to="/Post-New-Article" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageNewarticleIcon} className="mr-3" alt="" />
            Post New Article/Post
          </Link>
          <Link to="/Post-Video" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageVideoIcon} className="mr-3" alt="" />
            Post Video
          </Link>
        </div>
      )}

      <div
        className={`hover:bg-[#FFAC06] flex items-center justify-between px-5 py-2 mt-4 cursor-pointer ${
          dropManage ? 'bg-[#FFAC06]' : ''
        }`}
        onClick={() => setDropManage(!dropManage)}
      >
        <div className="flex items-center">
          <img src={manageIcon} className="mr-4" alt="" />
          Manage
        </div>
        <img src={dropManage ? dropdown : dropleft} alt="dropdown" />
      </div>

      {dropManage && (
        <div className="flex flex-col pl-10 text-sm">
          <Link to="/Manage-New-Headline" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageNewHeadlineIcon} className="mr-3" alt="" />
            Manage New Headline
          </Link>
          <Link to="/Manage-New-Article" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageNewarticleIcon} className="mr-3" alt="" />
            Manage New Article/Post
          </Link>
          <Link to="/Manage-Video" className="flex items-center hover:text-[#FFAC06] mt-2">
            <img src={manageVideoIcon} className="mr-3" alt="" />
            Manage Video
          </Link>
        </div>
      )}

      <Link to="/Post-News" className="hover:bg-[#FFAC06] flex items-center px-5 py-2 mt-4">
        <img src={profileIcon} className="mr-4" alt="" />
        Post News
      </Link>

      <Link to="/user-management" className="hover:bg-[#FFAC06] flex items-center px-5 py-2 mt-4">
        <img src={setting} className="mr-4" alt="" />
        User Management
      </Link>

      <Link to="/profile" className="hover:bg-[#FFAC06] flex items-center px-5 py-2 mt-4">
        <img src={profileIcon} className="mr-4" alt="" />
        Profile
      </Link>

      <Link to="/setting" className="hover:bg-[#FFAC06] flex items-center px-5 py-2 mt-4">
        <img src={setting} className="mr-4" alt="" />
        Setting
      </Link>
    </>
  );

  const footer = (
    <div className="border-t w-full px-5 pt-4 pb-6">
      <div className="flex items-center mb-4">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="ml-3">
          <p className="text-sm">News Paper</p>
          <p className="text-xs bg-[#FFCD71] text-black rounded px-2 mt-1 inline-block">
            Super Admin
          </p>
        </div>
      </div>
      <div className="flex items-center text-[#FFAC06] cursor-pointer" onClick={handleLogout}>
        <img src={logoutIcon} alt="logout" className="mr-2" />
        <button>Log Out</button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen w-[17%] bg-[#1C2059] text-white fixed left-0 z-50">
        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
        {footer}
      </div>

      {/* Mobile Sidebar */}
      {view && (
        <div className="fixed top-0 left-0 h-full w-60 bg-[#1C2059] text-white z-50 p-4 pt-20 lg:hidden">
          <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          {footer}
        </div>
      )}
    </>
  );
};

export default Sidebar;
