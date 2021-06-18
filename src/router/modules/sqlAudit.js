import Layout from '@/layout'

const sqlAuditRouter = {
  path: '/tisp',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Audit',
  meta: {
    title: 'SQL审核',
    icon: 'component'
  },
  children: [
    {
      path: 'sql-audit-manage',
      component: () => import('@/views/tisp/sql-audit-manage'),
      name: 'SQLAuditManagement',
      meta: { title: 'SQL审核管理', icon: 'nested', affix: true }
    },
    {
      path: 'applyForAudit',
      component: () => import('@/views/tisp/applyForAudit'),
      name: 'SQLAuditService',
      meta: { title: 'SQL审核服务', icon: 'nested', affix: true }
    }
  ]
}
export default sqlAuditRouter
