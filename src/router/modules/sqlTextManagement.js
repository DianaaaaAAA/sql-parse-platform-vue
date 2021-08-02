import Layout from '@/layout'

const sqlTextManagementRouter = {
  path: '/tisp',
  component: Layout,
  redirect: '/sql-text-manage',
  children: [
    {
      path: 'sql-text-manage',
      component: () => import('@/views/tisp/sql-text-manage'),
      name: 'sqlTextSelected',
      meta: { title: 'SQL脚本管理', icon: 'el-icon-coin', noCache: true }
    }
  ]
}

export default sqlTextManagementRouter
