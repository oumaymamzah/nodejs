class Generators {
    constructor() {
    }
     generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        // Generate a random string
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        // Ensure the generated string contains at least one number and one capital letter
        const hasNumber = /\d/.test(randomString);
        const hasCapital = /[A-Z]/.test(randomString);

        // If necessary characters are missing, insert them at random positions
        if (!hasNumber) {
            const randomNumber = Math.floor(Math.random() * 10);
            const randomPosition = Math.floor(Math.random() * randomString.length);
            randomString = randomString.substr(0, randomPosition) + randomNumber + randomString.substr(randomPosition);
        }

        if (!hasCapital) {
            const randomCapital = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            const randomPosition = Math.floor(Math.random() * randomString.length);
            randomString = randomString.substr(0, randomPosition) + randomCapital + randomString.substr(randomPosition);
        }

        return randomString;
    }

}
module.exports = Generators;