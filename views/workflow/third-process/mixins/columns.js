import {
  getProcessDefinitionNameTableColumn,
  getResourceNameTableColumn,
  getResourceProjectTableColumn,
} from '../../utils/columns'
import { statusMap, auditStatusMap } from '../../utils'
import {
  getCopyWithContentTableColumn,
  getTimeTableColumn,
} from '@/utils/common/tableColumn'
import { WORKFLOW_TYPES } from '@/constants/workflow'

export default {
  created () {
    this.columns = [
      getCopyWithContentTableColumn({
        field: 'id',
        title: '编号',
        hideField: true,
        minWidth: 80,
        onManager: this.onManager,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.id }</side-page-trigger>
          )
        },
      }),
      getProcessDefinitionNameTableColumn(),
      getResourceNameTableColumn(),
      getResourceProjectTableColumn({
        field: 'variables.resource_project_name',
        title: this.$t('dictionary.project'),
      }),
      {
        field: 'state',
        title: '流程状态',
        minWidth: 80,
        showOverflow: 'title',
        slots: {
          default: ({ row }, h) => {
            const statusObj = statusMap(row.process_definition_key)[row.state]
            if (statusObj) {
              return [
                <span style={{ color: statusObj.color }}>{statusObj.text}</span>,
              ]
            }
          },
        },
      },
      {
        field: 'audit_status',
        title: '审批结果',
        minWidth: 80,
        showOverflow: 'title',
        slots: {
          default: ({ row }, h) => {
            if (row.variables.audit_status) {
              const statusObj = auditStatusMap(row.process_definition_key)[row.variables.audit_status]
              if (row.process_definition_key === WORKFLOW_TYPES.CUSTOMER_SERVICE) {
                return [
                  <span style="color: #f6a100;">{row.audit_state}</span>,
                ]
              }
              if (statusObj) {
                return [
                  <span style={{ color: statusObj.color }}>{statusObj.text}</span>,
                ]
              }
            }
          },
        },
      },
      {
        field: 'status',
        title: '执行结果',
        minWidth: 100,
        showOverflow: 'title',
        sortable: true,
        slots: {
          default: ({ row }, h) => {
            const bizStatus = row.variables.biz_status
            if ((row.state === 'COMPLETED' || row.state === 'CUSTOM_TODO') && bizStatus) {
              return [
                <status status={ bizStatus } statusModule={ 'workflowBiz' } />,
              ]
            }
            return '-'
          },
        },
      },
      {
        field: 'assignee',
        title: '审批人',
        width: 80,
        showOverflow: 'title',
        slots: {
          default: ({ row }) => {
            const assignees = []
            if (Array.isArray(row.tasks)) {
              row.tasks.forEach((item) => {
                if (!item.delete_reason) {
                  assignees.push(item.assignee_name)
                }
              })
            } else {
              if (row.tasks && !row.delete_reason) {
                assignees.push(row.tasks.assignee_name)
              }
            }
            return assignees.length > 0 ? assignees.join(',') : '-'
          },
        },
      },
      getTimeTableColumn({ field: 'start_time', title: '创建日期' }),
      getTimeTableColumn({ field: 'end_time', title: '结束日期' }),
    ]
  },
}
