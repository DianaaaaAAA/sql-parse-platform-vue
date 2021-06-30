import Layout from '@/layout'

const sqlAuditRouter = {
  path: '/tisp',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Audit',
  meta: {
    title: 'SQL审核',
    icon: 'el-icon-edit'
  },
  children: [
    {
      path: 'sql-audit-manage',
      component: () => import('@/views/tisp/sql-audit-manage'),
      name: 'SQLAuditManagement',
      meta: { title: 'SQL审核管理', icon: 'el-icon-search', affix: true }
    },
    {
      path: 'applyForAudit',
      component: () => import('@/views/tisp/applyForAudit'),
      name: 'SQLAuditService',
      meta: { title: 'SQL审核服务', icon: 'el-icon-files', affix: true }
    }
  ]
}
export default sqlAuditRouter
