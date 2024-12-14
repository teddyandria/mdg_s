export default {
    login: async function (email, password) {
        console.log(`Email: ${email}, Password: ${password}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === "test@test.com" && password === "password") {
            const user = {
                token: "faketoken123456",
                id: 1, // Votre userId fictif
                email: "test@test.com",
                username: "test",
            };

            // Stocker l'utilisateur dans localStorage
            localStorage.setItem("user", JSON.stringify(user));

            return {
                token: user.token,
                user,
            };
        } else {
            throw new Error("Identifiants incorrects !");
        }
    },
};