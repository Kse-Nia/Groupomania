const testMail = /.+\@.+\..+/;
const testPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number;

module.exports = {
    testMail,
    testPassword,
}