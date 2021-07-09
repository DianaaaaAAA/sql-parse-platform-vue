import Layout from '@/layout'

const ruleManagementRouter = {
  path: '/tisp',
  component: Layout,
  children: [
    {
      path: 'rule-list',
      component: () => import('@/views/tisp/rule-list'),
      name: 'SQLAudit',
      meta: { title: '规则管理', icon: 'nested', affix: true }
    }
  ]
}
export default ruleManagementRouter
