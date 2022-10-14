<template>
    <div id="app">
        <form>
            <div class="form-group row mb-3">
                <label for="user_id" class="col-sm-2 col-form-label"> User ID</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="user_id" :disabled="disable" :value="'UserID-000'+this.user_id">
                </div>
            </div>
            <div class="form-group row mb-3">
                <label for="user_name" class="col-sm-2 col-form-label"> User Name </label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="user_name" v-model="user_name" :disabled="disable">
                    <span v-if="nameError" style="color: red;"> {{ this.nameError }}</span>
                </div>
            </div>
            <div class="form-group row mb-3" @change="genderOnChange">
                <label for="gender" class="col-sm-2 col-form-label"> Gender </label>
                <div class="form-check form-check-inline col-sm-2">
                    <label><input class="form-check-input" type="radio" name="gender" id="male" value="0" :disabled="disable">Male</label>
                </div>
                <div class="form-check form-check-inline col-sm-2">
                    <label><input class="form-check-input" type="radio" name="gender" id="female" value="1" :disabled="disable">Female</label>
                </div>
                <div class="col-sm-2">
                    <span v-if="genderError" style="color: red;"> {{ this.genderError }}</span>
                </div>
            </div>
            <div class="form-group row mb-3">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-2">
                    <input type="email" class="form-control" id="email" v-model="email" :disabled="disable">
                    <span v-if="emailError" style="color: red;"> {{ this.emailError }}</span>
                </div>
            </div>
            <div class="form-group row mb-3">
                <label for="address" class="col-sm-2 col-form-label">Address</label>
                <div class="col-sm-4">
                    <textarea class="form-control mb-3" id="address" rows="3" v-model="address" :disabled="disable"></textarea>
                    <span v-if="addressError" style="color: red;"> {{ this.addressError }}</span>
                </div>
            </div>
            <AgeArea :disable="disable" @date-data="getDOB(dateData)" />
            <div class="form-group row mb-3">
                <label for="user_role" class="col-sm-2 col-form-label">User Role</label>
                <div class="col-sm-2">
                    <select class="form-control custom-select" id="role" @change="roleOnChange($event)" :disabled="disable">
                        <option value=" "></option>
                        <option value="Administrator">Administrator</option>
                        <option value="User">User</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <button type="button" class="btn btn-primary" v-if="expanded == 0" @click="cancelProcess"> Cancel </button>
                    <button type="button" class="btn btn-primary" v-if="expanded == 1" @click="backTransition"> Back </button>
                </div>
                <div class="col-sm-6">
                    <button type="button" class="btn btn-primary" @click="toggleButton" v-if="expanded == 0"> Confirm </button>
                    <button type="button" class="btn btn-primary"  v-if="expanded == 1" @click="registerUser"> Register </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

import { Component, Vue, Emit} from 'vue-property-decorator'
import AgeArea from './AgeArea.vue'
import UserInfo from '../types/UserInfo'

@Component ({
    components: {
        AgeArea
    }
})

@Emit("date-data")

export default class UserRegister extends Vue {
    private user_id: number = 0
    private user_name:string = ''
    private gender:number|string = 0
    private email:string = ''
    private address:string = ''
    private user_role:string = ''
    private expanded:boolean = false
    private disable:boolean = false
    private nameError:string = ''
    private genderError:string = ''
    private emailType:string = '@gmail.com'
    private emailError:string = ''
    private addressError:string = ''
    private dob:Date = new Date
    private formatDate:string = ''
    private user_info: UserInfo = {
        id: 0,
        name: '',
        gender: '',
        email: '',
        address: '',
        dob: new Date(),
        role: ''
    }

    public genderOnChange(event: Event) {
        var data = (event.target as HTMLInputElement).value;
        this.gender = data;
        console.log(this.gender)
    }

    public roleOnChange(event: Event) {
        var role = (event.target as HTMLInputElement).value;
        this.user_role = role;
        console.log(this.user_role)
    }

    public toggleButton() {
        if(this.user_name == '') {
            this.nameError = 'User Name field is required!';
        }else {
            this.nameError = '';
        }

        if(this.gender == '') {
            this.genderError = 'Gender field is required!';
        }else{
            this.genderError = '';
        }
        if(this.email.indexOf(this.emailType) == -1) {
            this.emailError = 'Email is only accept email type eg: @gmail.com'
        }else if(this.email == '') {
            this.emailError = 'Email field is required!'
        }else {
            this.emailError = '';
        }

        if(this.address == '') {
            this.addressError = 'Address field is required!';
        }else {
            this.addressError = '';
        }

        if(this.nameError == '' && this.genderError == '' && this.emailError == '' && this.addressError == '') {
            this.expanded = true;
            this.disable = true;
        }else{
            this.disable = false;
        }
        console.log(this.disable);
    }

    public backTransition() {
        this.disable = false;
        this.expanded = false;
    }

    public cancelProcess() {
        this.user_name = '';
        this.email = '';
        this.address = '';
        this.user_role = '';
        console.log(this.user_role);
    }

    getDOB(dateData:Date) {
        console.log("in getDOB");
        console.log(dateData);
        this.dob = dateData;
        console.log(this.dob);
        this.formatDate = this.dob.toJSON().slice(0,10).replace(/-/g,'/');
        console.log(this.formatDate);
    }

    public registerUser() {
        if(this.expanded == true) {
           this.user_info.id =  this.user_id,
           this.user_info.name = this.user_name,
           this.user_info.gender = this.gender,
           this.user_info.email = this.email,
           this.user_info.address = this.address,
           this.user_info.dob = this.dob,
           this.user_info.role = this.user_role
        }
        console.log(this.user_info);
    }
}

// import Vue from 'vue'
// import AgeArea from './AgeArea.vue'

// export default Vue.extend({
//     name: 'UserRegister',
//     components: {
//         AgeArea,
//     },
//     data() {
//         return {
//             user_id: 0,
//             user_name: '',
//             gender: '',
//             email: '',
//             address: '',
//             user_role: '',
//             expanded: false,
//             disable: false,
//             nameError: '',
//             genderError: '',
//             emailType: '@gmail.com',
//             emailError: '',
//             addressError: '',

//         }
//     },
//     methods: {
//         genderOnChange(event: Event) {
//         var data = (event.target as HTMLInputElement).value;
//         this.gender = data;
//         console.log(this.gender)
//         },
//         roleOnChange(event: Event) {
//             var role = (event.target as HTMLInputElement).value;
//             this.user_role = role;
//             console.log(this.user_role)
//         },
//         toggleButton() {
//             if(this.user_name == '') {
//                 this.nameError = 'User Name field is required!';
//             }else {
//                 this.nameError = '';
//             }

//             if(this.gender == '') {
//                 this.genderError = 'Gender field is required!';
//             }else{
//                 this.genderError = '';
//             }

//             if(this.email.indexOf(this.emailType) == -1) {
//                 this.emailError = 'Email is only accept email type eg: @gmail.com'
//             }else if(this.email == '') {
//                 this.emailError = 'Email field is required!'
//             }else {
//                 this.emailError = '';
//             }

//             if(this.address == '') {
//                 this.addressError = 'Address field is required!';
//             }else {
//                 this.addressError = '';
//             }

//             if(this.nameError == '' && this.genderError == '' && this.emailError == '' && this.addressError == '') {
//                 this.expanded = true;
//                 this.disable = true;
//             }else{
//                 this.disable = false;
//             }
//             console.log(this.disable);
//         },
//         backTransition() {
//             this.disable = false;
//             this.expanded = false;
//         },
//         cancelProcess() {
//             this.user_name = '';
//             this.email = '';
//             this.address = '';
//             this.user_role = '';
//             console.log(this.user_role);
//         }
//     }
// })
</script>