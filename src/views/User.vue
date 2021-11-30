<template>
    <div class="form">
        <h1>{{user}}</h1>
        <h1>{{n}}</h1><br/>
        <button @click="add" class="btn btn-primary" type="button">Sumar</button>
        <button @click="sub" class="btn btn-danger" type="button">Reducir</button><br/>
        <button @click="logOut" class="btn">Salir</button>
    </div>
</template>
<script>
import store from '@/store';
import io from 'socket.io-client';
import axio from '../util/axios'
var socket = null;
export default {
    data() {
        return { 
            user: store.user,
            n: 0
        }
    },
    methods: {
        logOut() {
            store.user = null;
            this.$router.push("/");
        },
        add() {
            axio().post(`/ikcount/api/livecommand?atoken=${store.token}`, {
                "type": "manual-add",
                "quantity": 1,
                "client": store.client_id,
                "location": "IK001L1",
                "macaddress": "IK001MC1",
                "username": store.user,
                "email": store.email,
            })
        },
        sub() {
            axio().post(`/ikcount/api/livecommand?atoken=${store.token}`, {
                "type": "manual-sub",
                "quantity": 1,
                "client": store.client_id,
                "location": "IK001L1",
                "macaddress": "IK001MC1",
                "username": store.user,
                "email": store.email,
            })
        }
    },
    beforeMount() {
        socket = io('wss://ikcount.com/live', {query:{atoken: store.token }});
        socket.on('connect', () => { 
            console.log('connected');
            socket.on('disconnect', () => {
                console.log('disconnected');
            });
        });

        socket.on("welcome", data => {
            this.n = data.current_aforo;
        });
        socket.on("raw", data => {
            this.n = data.current_aforo;
        });
        socket.on("summary", data => {
            console.log('Sumario');
            console.log(data);
        });
        socket.on("heartbeat", data => {
            console.log('Beat');
            console.log(data);
        });
    },
    destroyed() {
        socket.close();

    }
    
}
</script>
