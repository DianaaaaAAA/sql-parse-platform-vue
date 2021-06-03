import Layout from '@/layout'

const sqlAuditRouter = {
  path: '/guide',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'SQLAudit',
      meta: { title: 'SQL审核', icon: 'guide', affix: true }
    }
  ]
}
export default sqlAuditRouter
