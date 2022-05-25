<script>
import '@wangeditor/editor/dist/css/style.css'
import { defineEmits, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  components: { Editor, Toolbar },
  props: ['htmlContent', 'noteSaveLoading'],
  emits: ['confirm', 'cancel'],
  setup(props, context) {
    const editorRef = shallowRef()
    const valueHtml = ref(props.htmlContent)
    const toolbarConfig = {
      toolbarKeys: ['header1', 'header2', 'bold', 'insertLink'],
    }
    const editorConfig = { placeholder: '请输入内容...' }

    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null)
        return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor
    }

    const handleConfirm = () => {
      context.emit('confirm', {
        content: toRaw(valueHtml.value),
      })
    }

    return {
      editorRef,
      mode: 'simple',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleConfirm,
    }
  },
}
</script>

<template>
  <n-card
    title="笔记"
    bordered
    size="huge"
    :closable="false"
    role="dialog"
    aria-modal="true"
    style="max-width: 50%;min-width: 400px;"
  >
    <template #header-extra>
      <n-button quaternary circle @click="$emit('cancel')">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>
    <div>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          :editor="editorRef"
          :default-config="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          v-model="valueHtml"
          :default-config="editorConfig"
          :mode="mode"
          style="height: 300px; overflow-y: hidden"
          @on-created="handleCreated"
        />
      </div>
    </div>

    <template #footer>
      <div style="text-align: right">
        <n-button type="primary" :loading="noteSaveLoading" @click="handleConfirm">
          保存
        </n-button>
      </div>
    </template>
  </n-card>
</template>
