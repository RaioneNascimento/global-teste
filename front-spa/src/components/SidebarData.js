import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { IoPeople } from "react-icons/io5";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Users',
    path: '/users',
    icon: <IoPeople />
  }
];
