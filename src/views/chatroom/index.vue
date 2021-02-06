<template>
  <div class="chatroom--background">
    <div class="container">
      <div class="chatroom">
        <div class="chatroom__sidebar">
          <h2 class="chatroom__sidebar-title">Inbox <span class="chatroom__sidebar-messages-count"><span>5</span></span>
          </h2>
          <div class="chatroom__search">
            <input
                type="search"
                id="search_chatroom"
                placeholder="Who are we looking for?"
                aria-label="Search through site content"
                required
            />
            <button class="search-form__submit" type="submit">
              <i class="fa fa-search"></i>
            </button>
          </div>
          <div class="chatroom__users">
            <template v-if="fakeUsers != null">
              <div class="chatroom__user" v-for="(user, index) in fakeUsers" :key="'user-message-'+index">
                <div class="chatroom__user-avatar">
                  <img :src="user.picture.thumbnail">
                </div>
                <div class="chatroom__user-name">{{user.name.first + ' ' + user.name.last}}</div>
              </div>
            </template>
          </div>
        </div>
        <div class="chatroom__content">
          <div class="chat-bar">
            <div class="item">
              <h2>Chat Room</h2>
            </div>
            <div class="item">
              To: search for a user
            </div>
            <div class="item">
              <button class="interest">Select an interest</button>
            </div>
          </div>
          <div class="chatroom__messages">
            <div class="message">
              <div class="message__avatar">
                <img :src="fakeUsers[0].picture.thumbnail">
              </div>
              <div class="message__text">
                <div class="message__text-content">Hi, how are you?</div>
                <div class="message__text-date">01.06.2020 15:34</div>
              </div>
            </div>
            <!--            11-->
            <div class="message message--my">
              <div class="message__avatar">
                <img :src="fakeUsers[0].picture.thumbnail">
              </div>
              <div class="message__text">
                <div class="message__text-content">Hi {{fakeUsers[0].name.first}} I am good thx how about you?</div>
                <div class="message__text-date">01.06.2020 15:37</div>
              </div>
            </div>
            <!--            11-->
            <div class="message">
              <div class="message__avatar">
                <img :src="fakeUsers[0].picture.thumbnail">
              </div>
              <div class="message__text">
                <div class="message__text-content">I am good too, thank you for chat</div>
                <div class="message__text-date">01.06.2020 15:40</div>
              </div>
            </div>
            <!--            11-->
            <div class="message message--my">
              <div class="message__avatar">
                <img :src="fakeUsers[0].picture.thumbnail">
              </div>
              <div class="message__text">
                <div class="message__text-content">You welcome {{fakeUsers[0].name.first}}</div>
                <div class="message__text-date">01.06.2020 15:42</div>
              </div>
            </div>
            <!--            11-->
            <div class="message">
              <div class="message__avatar">
                <img :src="fakeUsers[0].picture.thumbnail">
              </div>
              <div class="message__text">
                <div class="message__text-content">I am looking for your next templates</div>
                <div class="message__text-date">01.06.2020 15:45</div>
              </div>
            </div>
          </div>
          <div class="messages-form">
            <textarea class="messages-form__message" placeholder="Your message here..."></textarea>
            <button type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
    import axiosBase from "axios";

    import Footer from "@/components/Footer.vue";

    export default {
        name: "Chatroom",
        components: {
            Footer
        },
        data() {
            return {
                fakeUsers: []
            }
        },
        mounted() {
            axiosBase
                .get("https://randomuser.me/api/?results=20&nat=gb")
                .then(res => {
                    // console.log(res);
                    this.fakeUsers = res.data.results;
                })
                .catch(error => console.error(error));
        }
    }
</script>

<style lang="scss" scoped>
  .chatroom {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 15px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, .2);

    .chatroom__sidebar {
      /*box-shadow: 0px 1px 1px 1px rgba(0,0,0,.2);*/
      border-right: 1px solid rgba(0, 0, 0, .2);
      padding: 3rem 20px 3rem 0px;
    }

    .chatroom__sidebar-title {
      display: flex;
      align-items: center;

      .chatroom__sidebar-messages-count {
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1rem;
        width: 2rem;
        height: 2rem;

        span {
          position: relative;
          z-index: 2;
          color: #000;
          font-family: "Montserrat SemiBold", sans-serif;
          font-size: 1rem;
        }

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          border-radius: 50%;
          background-color: #f4ed3b;
          box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .8);
          z-index: 1
        }
      }
    }

    .chatroom__search {
      display: flex;
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      @include margin-top(2rem);

      input {
        flex: 1;
        border: 0px;
      }

      button {
        border: none;
        color: #393939;
        background: #fff;
        cursor: pointer;
        -webkit-appearance: none !important;
        border-radius: 0px;
        padding: 0px;
      }
    }

    .chatroom__users {
      @include margin-top(1.5rem);

    }

    .chatroom__user {
      display: flex;
      align-items: center;
      @include margin-bottom(1rem);

      .chatroom__user-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 1rem;
        font-size: 0;
        line-height: 1;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .chatroom__user-name {
        font-family: "Montserrat SemiBold", sans-serif;
      }
    }

    .chatroom__content {
      padding: 3rem 0px 3rem 20px;
    }
  }

  .message {
    display: flex;
    flex-direction: row;
    max-width: 50%;

    .message__avatar {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0;
      line-height: 1;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 1.5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .message__text-content {
      @include padding(1rem 1.5rem);
      border-radius: 15px;
      background-color: rgba(0, 0, 0, .05);
      position: relative;

      &::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 16px 8px 0;
        border-color: transparent rgba(0, 0, 0, .05) transparent transparent;
        position: absolute;
        left: -16px;
      }
    }

    .message__text-date {
      @include font-size(.8rem);
      margin-left: .8rem;
      margin-top: .3rem;
    }

    &.message--my {
      flex-direction: row-reverse;
      margin-left: auto;

      .message__avatar {
        margin-right: 0px;
        margin-left: 1.5rem;
      }

      .message__text-content {
        background-color: rgba(247, 171, 1, 0.17);

        &::before {
          display: none;
        }

        &::after {
          content: '';
          border-style: solid;
          border-width: 8px 0 8px 16px;
          border-color: transparent transparent transparent rgba(247, 171, 1, 0.17);
          position: absolute;
          right: -16px;
        }
      }
    }
  }

  .messages-form {
    display: flex;
    @include margin-top(3rem);

    textarea {
      flex: 1;
      border: 1px solid rgba(0, 0, 0, .2);
      @include padding(1.5rem);
    }

    button {
      border: 1px solid #e5e5e5;
      padding: 13px 10px;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 1px;
      @include font-size(0.8rem);
      cursor: pointer;
      transition: background-color 0.4s;
      display: block;
      background-color: #f4ed3b;
      font-family: "Montserrat SemiBold", sans-serif;
    }
  }

  .chat-bar {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    border-bottom: 1px solid rgba(0,0,0,.1);
    @include margin-bottom(2.5rem);

    .item {
      display: flex;
      align-items: center;
      height: 100%;
      @include padding(1.5rem);

      .interest {
        border: 1px solid #e5e5e5;
        padding: 13px 10px;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: 1px;
        @include font-size(0.8rem);
        cursor: pointer;
        transition: background-color 0.4s;
        display: block;
        background-color: #f4ed3b;
        font-family: "Montserrat SemiBold", sans-serif;
        margin-left: auto;
      }
    }


  }
</style>