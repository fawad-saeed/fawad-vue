<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            label="E-mail"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            :type="'password'"
                                            v-model="password"
                                            :rules="passwordRules"
                                            label="Password"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="submit" :disabled="!valid" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            valid: true,
            password: '',
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$http.post('/login/cockpit', {
                        email: this.email,
                        password: this.password
                    }).then(val => {
                        localStorage.setItem('user', val.data.body.user);
                        this.$router.push({name: "home"});
                    });
                }
            },
            clear() {
                this.$refs.form.reset();
            }
        }
    };
</script>

<style scoped>
</style>
