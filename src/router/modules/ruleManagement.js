import Layout from '@/layout'

const ruleManagementRouter = {
  path: '/documentation',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'RuleManagement',
      meta: { title: '规则管理', icon: 'documentation', affix: true }
    }
  ]
}
export default ruleManagementRouter
