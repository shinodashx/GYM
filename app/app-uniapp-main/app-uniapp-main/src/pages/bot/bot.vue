<template>
    <view>
        <view class="directask">
            <view class="askaquestion u-flex align-center">Ask Directly</view>
            <view class="textarea">
                <u--textarea v-model="prompt" placeholder="You can ask anything..." :adjustPosition="false" border="none"
                    confirm-type="done"></u--textarea>
                <view class="flex justify-end">
                    <view class="padding-lr-xs"></view>
                    <button @click="submit" class="cu-btn line-orange">Submit</button>
                </view>
            </view>
            <view class="askaquestion flex align-center">🤖AI Response<view class="padding-lr-xs"></view><u-icon
                    v-if="answerStatus == 2" @click="submit" name="reload"></u-icon></view>
            <view class="anser-area">
                <textarea v-if="answerStatus == 0" class="textarea" disabled readonly>Thinking...</textarea>
                <textarea v-if="answerStatus == 1" class="textarea" disabled readonly>Thinking...</textarea>
                <textarea v-if="answerStatus == 2" class="textarea" disabled readonly v-model="answer"></textarea>
                <!-- <zero-markdown-view style="padding: 0;" :markdown="answer"></zero-markdown-view> -->
            </view>
            <view v-if="answerStatus == 2" class="flex justify-center">
            </view>
            <view class="history">
                <view class="askaquestion flex align-center">📜History</view>
                <view v-for="item in history" :key="item.prompt" class="history-item">
                    <view class="prompt">{{ item.prompt }}</view>
                    <view class="answer">{{ item.answer }}</view>
                </view>
            </view>
        </view>
        <!-- <m-tabbar fixed fill :current="0" :tabbar="tabbar"></m-tabbar> -->
    </view>
</template>
  
<script>
import axios from 'axios'
// import {ask} from '@/api/bot'
// import { ask } from '../../api/bot';

export default {
    data() {
        return {
            prompt: '',
            answer: '',
            answerStatus: 0,
            history: [],
        }
    },
    methods: {
        async submit() {
            if (this.prompt == '') {
                uni.showToast({
                    title: 'Please input question',
                    icon: 'none'
                })
                return
            }
            this.answerStatus = 1
            this.answer = ''
            this.answer = 'Thinking...'
            axios.post(
                'http://38.47.115.99:3700/v1/chat/completions',
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [{ "role": "user", "content": this.prompt }],
                }
            ).then(res => {
                console.log(res)
                this.answerStatus = 2
                this.answer = res.data.choices[0].message.content

                console.log(this.answer)
                // if 500 in this.answer:
                //     this.answer = 'Thinking...'

               if (this.answer.indexOf('Internal Server Error') != -1) {
                    this.answer = 'Thinking...'
                    this.submit()
                    return
                }
                this.history.push({
                    prompt: this.prompt,
                    answer: this.answer
                })
            })
        },
    }
}




</script>
  
<style>
/* @import url("@/static/style/color-ui.css"); */

.directask {
    padding: 15px 15px 100px;
    border-top: 1px solid #ededed;
}

.directask .askaquestion {
    font-size: 16px;
    margin-bottom: 12px;
}

.textarea {
    box-shadow: 0 0 10px 5px hsla(0, 0%, 62%, .21176470588235294);
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    margin-left: 10rpx;
     margin-right: 10rpx;
    padding: 10px 15px 15px 6px;
    width: 90%;
}

.anser-area {
    box-shadow: 0 0 10px 5px hsla(0, 0%, 62%, .21176470588235294);
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 10px;
    min-height: 120px;
}

.directask .askaquestion {
    font-size: 16px;
    margin-bottom: 12px;
}

.refresh {
    color: rgb(158, 158, 158);
    margin-right: 5px;
}

.case {
    color: #26b3a0;
    background: #f5f8f7;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    padding-left: 15px;
    border-radius: 5px;
    margin: 12px 0;
    border-radius: 5px;
    overflow: hidden;
    display: -webkit-box !important;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical !important;
}
</style>