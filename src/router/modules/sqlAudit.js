import Layout from '@/layout'

const sqlAuditRouter = {
  path: '/components-demo',
  component: Layout,
  children: [
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SQLAudit',
      meta: { title: 'SQL审核', icon: 'nested', affix: true }
    }
  ]
}
export default sqlAuditRouter
