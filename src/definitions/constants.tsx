import React from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { GitHubIcon, GoogleIcon } from '@/components/ui/Logotips';
import {
  Users,
  UserCog,
  UserCheck,
  UserX,
  MousePointerClick,
  View,
  Star,
  ClipboardList,
  Loader,
  FilePlus2,
  Save,
  ArrowUpFromLine,
} from 'lucide-react';
import { TLatestUsers, TUsers } from '@/definitions/schemas';

export const createFormIcon = <FilePlus2 size={32} />;
export const clipboardIcon = <ClipboardList size={16} />;
export const gitHubIcon = <GitHubIcon />;
export const googleIcon = <GoogleIcon />;
export const iconEmail = <AtSymbolIcon className="input-icon" />;
export const iconPassword = <KeyIcon className="input-icon" />;
export const loaderIcon = <Loader className="animate-spin" />;
export const userCircleIcon = <UserCircleIcon className="input-icon" />;
export const viewIcon = <View size={16} />;
export const saveIcon = <Save />;
export const publishIcon = <ArrowUpFromLine />;

export const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
];

export const iconMap = {
  users: Users,
  superusers: UserCog,
  blockedUsers: UserX,
  activeUsers: UserCheck,
  mousePointer: MousePointerClick,
  view: View,
  star: Star,
  calculator: ClipboardList,
};

export const latestUsers = [
  {
    id: '1',
    name: 'Jackie',
    email: 'jackie@mail.com',
    created_at: '5 minute ago',
  },
  {
    id: '2',
    name: 'Polli',
    email: 'Polli@mail.com',
    created_at: '5 minute ago',
  },
];
