import Layout from '@/layout'

const ruleManagementRouter = {
  path: '/components-demo',
  component: Layout,
  redirect: '/components-demo/rule-edit',
  name: 'SQLRules',
  meta: {
    title: 'SQL审核规则',
    icon: 'documentation'
  },
  children: [
    {
      path: 'rule-edit/index/:id(\\d+)',
      component: () => import('@/views/components-demo/rule-edit/index'),
      name: 'EditRule',
      meta: { title: 'Edit Rule', noCache: true, activeMenu: '/components-demo/rule-list' },
      hidden: true
    },
    {
      path: 'rule-list',
      component: () => import('@/views/components-demo/rule-list'),
      name: 'RuleList',
      meta: {
        title: '规则库',
        icon: 'example'
      }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'RoleManage',
      meta: {
        title: '规则管理',
        icon: 'edit'
      }
    }
  ]
}
export default ruleManagementRouter
