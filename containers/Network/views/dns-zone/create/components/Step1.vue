<template>
  <div>
    <a-form
        class="mt-3"
        :form="form.fc"
        @submit.prevent="handleSubmit"
        v-bind="formItemLayout">
        <a-form-item :label="$t('network.text_205', [$t('dictionary.domain')])" v-if="isAdminMode">
          <domain-select v-decorator="decorators.project_domain" @change="handleDomainChange" />
        </a-form-item>
        <a-form-item :label="$t('network.text_717')">
          <a-select
            v-decorator="decorators.zoneType" @change="zoneTypeChangeHandle">
            <a-select-option v-for="v in options.zoneTypes" :value="v.value" :key="v.value">
              <div>{{ v.label }}<span class="ml-2">{{ v.desc }}</span></div>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('network.text_156')">
          <a-input v-decorator="decorators.name" :placeholder="$t('network.text_157')" />
        </a-form-item>
        <a-form-item :label="$t('common.description')">
          <a-textarea :auto-size="{ minRows: 1, maxRows: 3 }" v-decorator="decorators.description" :placeholder="$t('common_367')" />
        </a-form-item>
        <a-form-item :label="$t('common.text00012')" class="mb-0">
          <tag
            v-decorator="decorators.__meta__" />
        </a-form-item>
      </a-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { zoneTypes } from '../../constants'
import DomainSelect from '@/sections/DomainSelect'
import validateForm, { validate } from '@/utils/validate'
import { isValidDomain } from '@/utils/utils'
import Tag from '@/sections/Tag'

export default {
  name: 'DnsZoneCreateStep1',
  components: {
    DomainSelect,
    Tag,
  },
  data () {
    const projectDomainId = this.$store.getters.userInfo.projectDomainId
    const zoneType = zoneTypes[0].value
    return {
      project_domain: projectDomainId,
      options: {
        zoneTypes,
      },
      form: {
        fc: this.$form.createForm(this, {
          onValuesChange: (props, values) => {
            Object.keys(values).forEach((key) => {
              this.form.fd[key] = values[key]
            })
          },
        }),
        fd: {
          zoneType,
        },
      },
      decorators: {
        project_domain: [
          'project_domain',
          {
            initialValue: projectDomainId,
          },
        ],
        name: [
          'name',
          {
            validateFirst: true,
            rules: [
              { required: true, message: this.$t('network.text_157') },
              { validator: this.checkDomainHandle },
            ],
          },
        ],
        description: ['description'],
        zoneType: [
          'zoneType',
          {
            initialValue: zoneType,
            validateFirst: true,
            rules: [
              { required: true, message: this.$t('network.text_717') },
            ],
          },
        ],
        __meta__: [
          '__meta__',
          {
            rules: [
              { validator: validateForm('tagName') },
            ],
          },
        ],
      },
      formItemLayout: {
        wrapperCol: {
          span: 21,
        },
        labelCol: {
          span: 3,
        },
      },
    }
  },
  computed: {
    ...mapGetters(['isAdminMode']),
  },
  methods: {
    doCreate (data) {
      return new this.$Manager('dns_zones').create({ data })
    },
    handleDomainChange (val) {
      this.project_domain = val
    },
    checkDomainHandle (rule, value, callback) {
      if (this.form.fd.zoneType === 'PublicZone') {
        if (validate(value, 'domain') === false || validate(value, 'domain').result === false) {
          callback(new Error(this.$t('network.text_178')))
        }
        if (!isValidDomain(value)) {
          callback(new Error(this.$t('network.subdomain_not_supported')))
        }
      }
      callback()
    },
    zoneTypeChangeHandle () {
      this.$nextTick(() => {
        this.form.fc.validateFields(['name'], { force: true })
      })
    },
  },
}
</script>
