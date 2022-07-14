<script setup>
const router = useRouter()
</script>

<template>
  <div mx-auto w-full py-10 px-5 class="lg:w-1/2">
    <div i-mdi:arrow-left-circle text-2xl text-primary cursor-pointer @click="router.back()" />

    <div mt-8 text-2xl>
      关于作者
    </div>

    <div text-base>
      <div
        v-for="(item, index) in [
          '我叫张小张，我是一名白天代码，晚上吉他，年轻力壮的男程序员 👨🏻‍💻',
          '程序是工作，吉他是兴趣使然。当然，代码也是个人所热爱的',
          '自己小时候学过6年的二胡，2、3年的绘画。艺术细胞还是有点的',
          '后来高中又去学了编程，现在又抱起了吉他',
          '天天练吉他，用了很多的看谱软件，都感觉不是太好用，始终找不到称心如意的',
          '我直接索性自己去写一个',
        ]"
        :key="index"
        mt-8
      >
        {{ item }}
      </div>

      <div mt-8 text-primary>
        <div
          v-for="(item, index) in [
            '能把产品做出来，并推向市场让用户使用还是非常激动的',
            '关于产品，如果你有很多的奇思妙想，务必尽快找我，哈哈哈',
            '一起做一些富有意义的事情，还是令人相当开心的',
          ]"
          :key="index"
          mt-8
        >
          {{ item }}
        </div>
      </div>

      <div mt-8 mb-5 text-gray-500 text-xl>
        联系方式
      </div>
      <div>
        <!-- <div
          v-for="(item, index) in [
            { label: '邮箱', icon: '', value: '1067408814@qq.com' },
            { label: '交流QQ群', icon: '', value: '671644918' },
          ]"
          :key="index"
          mt-8
        >
          <div pb-1>
            {{ item.label }}
          </div>
          <div>{{ item.value }}</div>
        </div> -->
        <div>Email</div>
        <div>1067408814@qq.com</div>
        <div h-5 />
        <div>交流Q群</div>
        <div>671644918</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
