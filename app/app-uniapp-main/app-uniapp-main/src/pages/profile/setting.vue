<template>
    <view class="profile-setting" v-if="isLoading === false">
        <u-cell-group v-if="editing === false">
            <u-cell title="Avatar" value="avatar" isLink></u-cell>
            <u-cell title="Username" :value="user.username" isLink></u-cell>
            <u-cell title="Email" :value="user.email" isLink></u-cell>
            <u-cell title="Role" :value="user.role" isLink></u-cell>
            <u-cell title="Gender" :value="user.gender" isLink></u-cell>
            <u-cell title="Phone" :value="user.phone" isLink></u-cell>
        </u-cell-group>
        <!-- form -->
        <u-form v-if="editing === true" labelWidth="200">
            <u-form-item label="Avatar" required borderBottom>
                <u-input disabled type="text" border="none" placeholder="Avatar" v-model="user.avatar"></u-input>
            </u-form-item>
            <u-form-item label="Username" required borderBottom>
                <u-input disabled type="text" border="none" placeholder="Username" v-model="user.username"></u-input>
            </u-form-item>
            <u-form-item label="Email" required borderBottom>
                <u-input type="text" border="none" placeholder="Email" v-model="user.email"></u-input>
            </u-form-item>
            <u-form-item label="Role" required borderBottom>
                <u-input disabled type="text" border="none" placeholder="Role" v-model="user.role"></u-input>
            </u-form-item>
            <u-form-item label="Gender" required borderBottom>
                <u-input type="text" border="none" placeholder="Gender" v-model="user.gender"></u-input>
            </u-form-item>
            <u-form-item label="Phone" required borderBottom>
                <u-input type="text" border="none" placeholder="Phone" v-model="user.phone"></u-input>
            </u-form-item>
        </u-form>

        <u-button type="primary" size="large" @click="handleEdit">
            {{editing ? 'Save' : 'Edit'}}
        </u-button>
    </view>

</template>

<script>
import { getProfile, updateProfile } from '../../api/account'
export default {
    data() {
        return {
            user: {},
            isLoading: true,
            editing: false,
        }
    },
    methods: {
        async getUserProfile() {
            await getProfile().then(res => {
                this.user = res.data.data
                console.log(this.user)
                this.user.avatar = 'http://101.42.160.53:16800/' + this.user.avatar
                this.isLoading = false
            }).catch(err => {
                console.log(err)
            })
        },
        async handleEdit() {
            if (this.editing) {
                // save
                console.log('save')
                await updateProfile(
                    {
                        gender: this.user.gender,
                        phone: this.user.phone,
                        email: this.user.email,
                    }
                ).then(res => {
                    this.getUserProfile()
                    // toast
                    uni.showToast({
                        title: 'Update success',
                        icon: 'success',
                        duration: 2000
                    })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                // edit
                console.log('edit')
            }
            this.editing = !this.editing
        }
    },
    onLoad() {
        this.getUserProfile()
    }

}
</script>

<style scoped>
.profile-setting {
    padding: 0 20px;
}
</style>