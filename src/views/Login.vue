<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header justify-content-center"><h3 class="font-weight-light my-4">Login</h3></div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group"><label class="small mb-1" for="inputEmailAddress">Email</label>
                                            <input v-model="username" name="username" class="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                        </div>
                                        <div class="form-group"><label class="small mb-1" for="inputPassword">Password</label>
                                            <input v-model="password" class="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" />
                                        </div>
                                        <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a @click="login" class="btn btn-primary">Login</a></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import axios from '../util/axios';
export default {
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
            login() {
                axios().post('/api/login',{
                    "auth": btoa(`${this.username}:${this.password}:IKLAB005`),
                    "privilegesDetail": true
                })
                .then(res => {
                    store.user=res.data.username;
                    store.token = res.data.access_token;
                    store.client_id=res.data.client_id;
                    store.email = res.data.email;
                    this.$router.push('/user');
                })
                .catch(err => {
                    console.log(err);
                    store.user=null;
                })

        }
    }
}
</script>