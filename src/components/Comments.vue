<template>
    <div class="event-title__comments-section">
        <div class="event-title__comments-section__category">
            <h2 class="event-title__comments-section__category__title">
                <b>Comments</b>
                <span>Visit our comments page| Read our comments policy</span>
            </h2>
            <div class="event-title__comments-section__category__info">
                <div class="event-title__comments-section__category__info__comments-counter">
                    <b>1 Comment</b>
                </div>
                <div class="event-title__comments-section__category__info__user-login">
                    <img height="30" width="30" src="/images/main/icon-profile.svg" class="user__avatar"/>Login
                </div>
            </div>
        </div>
        <div class="event-title__comments-section__recommend">
            <b>Recommend</b>
            <VButton
                class="event-title__comments-section__recommend__icon-btn"
                shape="round"
                size="small"
                color="blue"
            >
                <router-link
                    class="event__button-link"
                    :to="'#'"><i class="fa fa-facebook"></i></router-link>
            </VButton>
            <span>{{ shareText }}</span>

            <VButton
                    class="event-title__comments-section__recommend__icon-btn"
                    shape="round"
                    size="small"
                    color="light-blue"
            >
                <router-link
                        class="event__button-link"
                        :to="'#'"><i class="fa fa-twitter"></i></router-link>
            </VButton>
            <span>Tweet</span>
        </div>
        <input class="event-title__comments-section__join-conversation-input" placeholder="Join the conversation..."/>
        <div class="event-title__comments-section__login-view">
            <div class="event-title__comments-section__login-view__left-side">
                <b>Login with</b>
                <div class="event-title__comments-section__login-view__left-side__login-with">
                    <VButton
                        class="event-title__comments-section__login-view__left-side__login-with__icon-btn"
                        shape="round"
                        size="small"
                        color="blue"
                    >
                        <router-link
                            class="event__button-link"
                            :to="'#'"><i class="fa fa-facebook"></i></router-link>
                    </VButton>
                    <VButton
                        class="event-title__comments-section__login-view__left-side__login-with__icon-btn"
                        shape="round"
                        size="small"
                        color="purple"
                    >
                        <router-link
                            class="event__button-link"
                            :to="'#'"><i class="fa fa-instagram"></i></router-link>
                    </VButton>
                    <VButton
                        class="event-title__comments-section__login-view__left-side__login-with__icon-btn"
                        shape="round"
                        size="small"
                        color="light-blue"
                    >
                        <router-link
                            class="event__button-link"
                            :to="'#'"><i class="fa fa-twitter"></i></router-link>
                    </VButton>
                    <VButton
                        class="event-title__comments-section__login-view__left-side__login-with__icon-btn"
                        shape="round"
                        size="small"
                        color="red"
                    >
                        <router-link
                            class="event__button-link"
                            :to="'#'"><i class="fa fa-google"></i></router-link>
                    </VButton>
                </div>
                <div v-if="!isHovered" class="event-title__comments-section__login-view__left-side__comments">
                    <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" height="75" width="75"/>
                    <div>
                        <p><b>John Smith|</b> 1 hour ago</p>
                        <p>The last event was great one, incredibly inspiring</p>
                        <div>
                            <button>Replay</button>
                            <button href="#">Share</button>
                        </div>
                    </div>
                </div>
            </div>
            <LogInComments
                :is-hovered="isHovered"
                @mouse-enter="mouseEnter"
                @mouse-leave="mouseLeave" />
        </div>
    </div>
</template>

<script>
import {VButton } from "@/components/app";
import LogInComments from '@/components/forms/LogInComments.vue';

export default {
    name: "Comments",
    props: {
        shareText: {
            type: String,
            default: ''
        }
    },
    components: {
        VButton,
        LogInComments
    },
    data: () => ({
        isHovered: false
    }),
    methods: {
        mouseEnter() {
            this.isHovered = true;
        },
        mouseLeave() {
            this.isHovered = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .event-title{
        &__comments-section {
            &__category {
                display: flex;
                flex-direction: column;
                padding-top: 14px;
                border-bottom: 2px solid #ffe300;
                border-top: 2px solid #ffe300;
                &__title {
                    color: black;
                    font-family: "Gotham Light", sans-serif;
                    font-size: 30px;
                    line-height: 40px;
                    display: flex;
                    flex-direction: column;
                    b {
                        font-family: "Gotham Bold", sans-serif;
                    }
                    span {
                        font-size: 15px;
                        margin-top: -10px;
                    }
                }
                &__subtitle {
                    color: black;
                    font-family: "Gotham Light", sans-serif;
                    line-height: 40px;
                    margin: 0;
                    b {
                        font-family: "Gotham Bold", sans-serif;
                    }
                }
                &__info {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    &__comments-counter {
                        color: black;
                        font-family: "Gotham Light", sans-serif;
                        font-size: 17px;
                        margin-top: 5px;
                        b {
                            font-family: "Gotham Bold", sans-serif;
                        }
                    }
                    &__user-login {
                        img {
                            margin: 0 15px;
                            margin-bottom: 4px;
                        }
                    }
                }
            }
            &__recommend {
                display: flex;
                flex-direction: row;
                margin-top: 20px;
                a {
                    text-decoration: none;
                    color: white
                }
                &__icon-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 700;
                    margin: 0 10px;
                    width: 25px;
                    height: 23px;
                    padding: 0;
                }
            }
            &__join-conversation-input {
                width: 70%;
                border-radius: 10px;
                font-size: 16px;
                padding: 10px;
                margin-top: 20px;
                &::placeholder {
                    font-weight: bold;
                    color: black;
                }
            }
            &__login-view {
                display: flex;
                &__left-side {
                    position: static;
                    width: 200px;
                    margin-top: 30px;

                    a {
                        color: white;
                    }
                    &__comments {
                        display: flex;
                        flex-direction: row;
                        width: 600px;
                        text-align: left;
                        margin-left: 20px;
                        position: absolute;
                        p {
                            margin-left: 20px;
                        }
                        button {
                            border: none;
                            background: none;
                            color: black;
                            font-weight: bold;
                            font-size: 16px;
                            margin: 0 15px;
                            z-index: 999;
                            &:hover {
                                color: #ffe300;
                                cursor: pointer;
                            }
                        }
                    }
                    &__login-with {
                        display: flex;
                        margin-top: -10px;
                        &__icon-btn {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 14px;
                            font-weight: 700;
                            margin: 20px 10px 30px 0;
                            width: 25px;
                            height: 23px;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
</style>
