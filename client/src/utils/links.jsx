import React from 'react';

import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdQueryStats } from 'react-icons/md';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  { text: 'add job', path: '.', icon: <FaWpforms /> },
  { text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;