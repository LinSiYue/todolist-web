/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Kanban',
    icon: 'component'
  },
  children: [
    {
      path: 'project-kanban',
      component: () => import('@/views/kanban/project-kanban'),
      name: 'ProjectKanban',
      meta: { title: 'Project Kanban' }
    },
    {
      path: 'task-kanban',
      component: () => import('@/views/kanban/task-kanban'),
      name: 'TaskKanban',
      meta: { title: 'Task Kanban' }
    }
  ]
}

export default componentsRouter
