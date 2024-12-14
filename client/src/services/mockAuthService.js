export default {
    login: async function (email, password) {
        console.log(`Email: ${email}, Password: ${password}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === "test@test.com" && password === "password") {
            return {
                token: "faketoken123456",
                user: {
                    id: 1,
                    email: "test@test.com",
                    username: "test",
                },
            };
        } else {
            throw new Error("Identifiants incorrects !");
        }
    },
};
