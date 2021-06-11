import Layout from '@/layout'

const sqlAuditRouter = {
  path: '/tisp',
  component: Layout,
  children: [
    {
      path: 'sql-audit-manage',
      component: () => import('@/views/tisp/sql-audit-manage'),
      name: 'SQLAudit',
      meta: { title: 'SQL审核', icon: 'nested', affix: true }
    }
  ]
}
export default sqlAuditRouter
