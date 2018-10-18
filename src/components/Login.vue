<template>
    <v-container fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
            ></v-text-field>
            <v-btn
                    :disabled="!valid"
                    @click="submit"
            >
                Login
            </v-btn>
        </v-form>
    </v-container>
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
          // Native form submission is not yet supported
          this.$http.post('/login', {
            email: this.email,
            password: this.password
          }).then(val => {
            console.log(val);
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
