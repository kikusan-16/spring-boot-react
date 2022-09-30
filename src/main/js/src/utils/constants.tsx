import React from 'react';
import JWTAuth from '../components/Auth/JWTAuth';
import OAuth from '../components/Auth/OAuth';
import Kanban from '../components/Cruds/Kanban';
import Video from '../components/Video/Video';
import WebSocketSample from '../components/WebSocket/WebSocket';
import { SectionProps } from './types';

export const sectionContents: SectionProps[] = [
  {
    index: 1,
    title: 'CRUD sample.',
    path: '/crud',
    content: <Kanban />
  },
  {
    index: 2,
    title: 'OAuth2 sample.',
    path: '/oauth2',
    content: <OAuth />,
    note: <>
      <p>if you play oauth, you must set the OAuth Client Setting and application.yml. </p>
      <p>&nbsp;&nbsp;→ see&nbsp;<a href="https://spring.pleiades.io/guides/tutorials/spring-boot-oauth2/">https://spring.pleiades.io/guides/tutorials/spring-boot-oauth2/</a></p>
      <p>else then use <code>id: system@sehippomcapus.work, pass: password</code></p>
      <p><a href="/login">login page</a></p>
      <p><a href="/logout">logout page</a></p>
    </>
  },
  {
    index: 3,
    title: 'JWT sample.',
    path: '/jwt',
    content: <JWTAuth />
  },
  {
    index: 4,
    title: 'Video sample.',
    path: '/video',
    content: <Video />
  },
  {
    index: 5,
    title: 'WebSocket sample.',
    path: '/websocket',
    content: <WebSocketSample />
  }
];
Object.freeze(sectionContents);

export const KanbanDivisionType = {
  todo: 'kanban/todo',
  doing: 'kanban/doing',
  done: 'kanban/done'
} as const;

export const KanbanDivisionColor = {
  none: 'border',
  todo: 'border-danger',
  doing: 'border-warning',
  done: 'border-success'
} as const;

export const baseUrl: string = 'http://localhost:8080';
