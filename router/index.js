import Kubeclusters from '@K8S/views/cluster'
import KubeclustersCreate from '@K8S/views/cluster/create'
import KubeclustersImport from '@K8S/views/cluster/import'
import Deployment from '@K8S/views/deployment'
import K8sDeploymentCreate from '@K8S/views/deployment/create'
import K8SNode from '@K8S/views/nodes'
import K8sStorageclasses from '@K8S/views/storage-class'
import K8sStorageclassesCreate from '@K8S/views/storage-class/create'
import Statefulset from '@K8S/views/statefulset'
import K8sStatefulsetCreate from '@K8S/views/statefulset/create'
import Pod from '@K8S/views/pod'
import Job from '@K8S/views/job'
import K8sJobCreate from '@K8S/views/job/create'
import CronJob from '@K8S/views/cronjob'
import K8sCronJobCreate from '@K8S/views/cronjob/create'
import Layout from '@/layouts/RouterView'

export default {
  index: 3,
  meta: {
    label: '容器',
    icon: 'menu-k8s',
  },
  menus: [
    {
      meta: {
        label: '应用',
      },
      submenus: [
        {
          path: '/k8s-deployment',
          meta: {
            label: '无状态',
            permission: 'k8s_depolyments_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sDeploymentList',
              path: '',
              component: Deployment,
            },
            {
              name: 'K8sDeploymentCreate',
              path: 'create',
              component: K8sDeploymentCreate,
            },
          ],
        },
        {
          path: '/k8s-statefulset',
          meta: {
            label: '有状态',
            permission: 'k8s_statefulsets_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sStatefulsetList',
              path: '',
              component: Statefulset,
            },
            {
              name: 'K8sStatefulsetCreate',
              path: 'create',
              component: K8sStatefulsetCreate,
            },
          ],
        },
        {
          path: '/k8s-job',
          meta: {
            label: '任务',
            permission: 'k8s_jobs_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sJobList',
              path: '',
              component: Job,
            },
            {
              name: 'K8sJobCreate',
              path: 'create',
              component: K8sJobCreate,
            },
          ],
        },
        {
          path: '/k8s-cronjob',
          meta: {
            label: '定时任务',
            permission: 'k8s_cronjobs_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sCronJobList',
              path: '',
              component: CronJob,
            },
            {
              name: 'K8sCronJobCreate',
              path: 'create',
              component: K8sCronJobCreate,
            },
          ],
        },
        {
          path: '/k8s-pod',
          meta: {
            label: '容器组',
            permission: 'k8s_pods_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sPodList',
              path: '',
              component: Pod,
            },
          ],
        },
      ],
    },
    {
      meta: {
        label: '集群',
      },
      submenus: [
        {
          path: '/k8s-cluster',
          meta: {
            label: '集群',
            permission: 'k8s_kubeclusters_list',
          },
          component: Layout,
          children: [
            {
              name: 'Kubeclusters',
              path: '',
              component: Kubeclusters,
            },
            {
              name: 'KubeclustersImport',
              path: 'import',
              component: KubeclustersImport,
            },
            {
              name: 'KubeclustersCreate',
              path: 'create',
              component: KubeclustersCreate,
            },
          ],
        },
        {
          path: '/k8s-node',
          meta: {
            label: '节点',
            permission: 'k8s_k8sNode_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8SNode',
              path: '',
              component: K8SNode,
            },
          ],
        },
        {
          path: '/k8s-storageclass',
          meta: {
            label: '存储类',
            permission: 'k8s_storageclasses_list',
          },
          component: Layout,
          children: [
            {
              name: 'K8sStorageclasses',
              path: '',
              component: K8sStorageclasses,
            },
            {
              name: 'K8sStorageclassesCreate',
              path: 'create',
              component: K8sStorageclassesCreate,
            },
          ],
        },
      ],
    },
  ],
}
