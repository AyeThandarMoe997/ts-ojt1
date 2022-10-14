<template>
    <div class="form-group row mb-3">
        <label for="dob" class="col-sm-2 col-form-label"> Date Of Brith </label>
        <div class="col-sm-2" :enabled="disable">
            <date-picker :disabled="disable" v-model="dateofbrith"></date-picker>
        </div>
        <label for="age" class="col-sm-2 col-form-label"> Age </label>
        <div class="col-sm-2">
            <input type="text" class="form-control" id="age" :disabled="disable" :value="calculateAge()">
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Emit, Prop,Vue } from 'vue-property-decorator';

@Component
export default class AgeArea extends Vue {
    @Prop() readonly disable!: boolean

    private dateofbrith:Date = new Date()

    @Emit('date-data')
    brithDate() {
        return this.dateofbrith;
    }

    public calculateAge() {
        const today = new Date();
        let age = today.getFullYear() - this.dateofbrith.getFullYear();
        const month = today.getMonth() - this.dateofbrith.getMonth();
        if(month < 0 || month === 0 && today.getDate < this.dateofbrith.getDate) {
            age = age-1;
        }
        return age;
    }
}

// export default  Vue.extend({
//     name: 'AgeArea',
//     props: ['disable'],
//     data: () => {
//         return  {
//             dateofbrith: new Date(),
//         }
//     },
//     methods: {
//         calculateAge() {
//             const today = new Date();
//             let age = today.getFullYear() - this.dateofbrith.getFullYear();
//             const month = today.getMonth() - this.dateofbrith.getMonth();
//             if(month < 0 || month === 0 && today.getDate < this.dateofbrith.getDate) {
//                 age = age-1;
//             }
//             return age;
//         }
//     }

// })
</script>