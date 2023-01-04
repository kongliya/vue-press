# vue项目日常总结;
## table两列进行级联。select的change事件返回整个item，而不是某个值（并返回index）;
```
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
    "CustomerFee":	"客情费",
    "TravelFee":	"差旅交通费",
    "DailyOfficeFee":	"日常办公费",
    "SFMarketActivities":	"学术会议-省级-2月份神经中心活动",
    "SFPatientPromotions":	"困难患者支持:每植入15套全部型号产品赠送1套电极",
    "SFHPSupport":	"个性化支持-某主任:每植入6套全部型号产品赠送500元现金",
    "SFDealerPromotions":	"山西医保：每植入8套全部型号，赠送1电极",
}

js：
levelOneItemChange(val,idx){
    this.$set(this.BudgetTableData[idx],"levelTwoItemInfo",this.levelTwoItemObj[val.level_one_item_code]);
},
```