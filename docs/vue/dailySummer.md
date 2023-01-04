# vue项目日常总结
## 1. table两列进行级联(select的change事件返回整个item，而不是某个值并返回index)
```
<!-- table两列进行级联。select的change事件返回整个item，而不是某个值（并返回index） -->
<el-table-column
    label="费用项（一级支出项）"
    prop="level_one_item"
    min-width="170px"
>
    <template scope="scope">
        <el-select
            class="search-field"
            v-model="scope.row.level_one_item"
            placeholder="请选择费用项（一级支出项）"
            value-key="level_one_item_code"
            @change="((value)=>{levelOneItemChange(value, scope.$index)})"
        >
            <el-option
            v-for="item in levelOneItemOptions"
            :key="item.level_one_item_code"
            :label="item.level_one_item"
            :value="item"
            />
        </el-select>
    </template>
</el-table-column>

<el-table-column
    label="预算费用项目名称（二级支出项）"
    prop="level_two_item"
    min-width="380px"
    show-overflow-tooltip
>
<template scope="scope">
    <el-input v-model="scope.row.level_two_item" :placeholder="scope.row.levelTwoItemInfo || levelTwoItemObj[scope.row.level_one_item_code]"></el-input>
</template>
</el-table-column>

对应关系：
levelTwoItemObj: {
    "CustomerFee":	"xxx1",
    "TravelFee":	"xxx2",
    "DailyOfficeFee":	"xxx3",
    "SFMarketActivities":	"xxx4",
    "SFPatientPromotions":	"xxx5",
    "SFHPSupport":	"xxx6",
    "SFDealerPromotions":	"xxx7",
}

js：
levelOneItemChange(val,idx){
    this.$set(this.BudgetTableData[idx],"levelTwoItemInfo",this.levelTwoItemObj[val.level_one_item_code]);
},
```

## 2. 整体页面固定，实现局部滚动效果
```
<!-- 整体思想 -->
外包围overflow: hidden;
并且设置宽高均为100%;

内部区域多出后设置overflow: auto;
```

## 3. Vue3.x ref与reactive
```
<!-- 1. ref通常用于声明基础类型响应式数据。 -->
import { ref } from 'vue' 
const age =ref(10) //声明响应式数据

<!-- 2. ref返回的是被包装过的响应式对象，在setup中访问和修改ref需要使用.value属性 -->

age.value.....

<!-- 1. reactive用于声明复杂类型响应式数据。 -->
mport {reactive} from 'vue'

const man=ref({name:'jolin',age:21}) //声明响应式数据

<!-- 2.reactive返回的是被包装过的响应式对象，在setup中访问和修改直接使用属性即可 -->

```
注意事项  

1.注意不能解构reactive数据，解构出的数据会失去响应式。  

2.在任何地方访问响应式数据都能拿到最新的。  

3.同vue2的data，只有数据被应用到模板中时，数据的改变才会触发updated生命周期，否则即使数据被修改了，也不会触发updated生命周期，导致视图不更新。  

## 4. Vue3.x proxy响应式取原生值
```
import { toRaw } from "@vue/reactivity";
const temp = toRaw(xxx)
```

## 5. Vue3.x element-plus
```
import { ElMessage, ElMessageBox } from "element-plus";

```
## 6. Vue3.x useRouter
```
import { useRouter } from 'vue-router';
const Router = useRouter();
Router.push("xxx");
``` 
## 7. Vue3.x nextTick onMounted forceUpdate
```
import { ref, reactive, onMounted, getCurrentInstance } from "vue";

const {
  proxy: { $nextTick, $forceUpdate },
} = getCurrentInstance();

onMounted(() => {
  xxxx();
})
```
## 8. Vue3.x 引入静态文件（背景图）
```
<span class="card_tag"
:style="{'background-image': `url(${require('../../assets/img/order/tagBg.png')})`,}"
>{{ xxxx }}</span>
```


## 9. Vue3.x setup
```
<!-- 可直接使用不必声明 -->
<historyPdfView :pdfUrl="linkAddress" />

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ApiPostOrderSelect, ApiGetLabel, ApiGetTherapy } from '@/apis';
import { fenToyuan } from '@/utils';
import { toRaw } from '@vue/reactivity';
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router';
import * as utils from '@/utils'
<!-- 可直接引入组件 -->
import xxxx from './components/xxxx.vue';

const Router = useRouter();
const {
  proxy: { $nextTick, $forceUpdate },
} = getCurrentInstance();

let xx = ref("");

const xxx = (value, idx) => {
}

</script>

```