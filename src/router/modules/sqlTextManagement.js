import Layout from '@/layout'

const sqlTextManagementRouter = {
  path: '/table',
  component: Layout,
  children: [
    {
      path: 'sql-text-manage',
      component: () => import('@/views/tisp/sql-text-manage'),
      name: 'InstanceSelected',
      meta: { title: 'SQL脚本管理', icon: 'el-icon-coin', noCache: true }
    }
  ]
}

export default sqlTextManagementRouter
