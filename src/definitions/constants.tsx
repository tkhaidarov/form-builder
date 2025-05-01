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

export const latestUsers: TLatestUsers[] = [
  {
    id: '1',
    name: 'Jackie',
    email: 'jackie@mail.com',
    lastSeen: '5 minute ago',
  },
  {
    id: '2',
    name: 'Polli',
    email: 'Polli@mail.com',
    lastSeen: '5 minute ago',
  },
];

export const users: TUsers[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Алексей Петров',
    email: 'alex.petrov@example.com',
    lastSeen: '2025-04-22T09:30:15Z',
    status: 'blocked',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Мария Иванова',
    email: 'maria.i@example.com',
    lastSeen: '2025-04-21T16:45:22Z',
    status: 'blocked',
    position: 'admin',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Дмитрий Соколов',
    email: 'd.sokolov@example.com',
    lastSeen: '2025-04-22T11:15:00Z',
    status: 'active',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Елена Смирнова',
    email: 'e.smirnova@example.com',
    lastSeen: '2025-04-20T18:22:10Z',
    status: 'active',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: 'Игорь Козлов',
    email: 'i.kozlov@example.com',
    lastSeen: '2025-04-22T08:05:33Z',
    status: 'blocked',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Алексей Петров',
    email: 'alex.petrov@example.com',
    lastSeen: '2025-04-22T09:30:15Z',
    status: 'blocked',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Мария Иванова',
    email: 'maria.i@example.com',
    lastSeen: '2025-04-21T16:45:22Z',
    status: 'blocked',
    position: 'admin',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Дмитрий Соколов',
    email: 'd.sokolov@example.com',
    lastSeen: '2025-04-22T11:15:00Z',
    status: 'active',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Елена Смирнова',
    email: 'e.smirnova@example.com',
    lastSeen: '2025-04-20T18:22:10Z',
    status: 'active',
    position: 'user',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: 'Игорь Козлов',
    email: 'i.kozlov@example.com',
    lastSeen: '2025-04-22T08:05:33Z',
    status: 'blocked',
    position: 'user',
  },
];
