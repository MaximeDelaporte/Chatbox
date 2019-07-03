const expect = require('chai').expect;

function addTwoNumbers(a, b){
    return a + b
}

describe('addTwoNumbers()', function () {
    it('should add two numbers', function () {

        // 1. Initialisation
        let x = 5;
        let y = 1;
        let sum1 = x + y;

        // 2. Execution
        let sum2 = addTwoNumbers(x, y);

        // 3. Vérification
        expect(sum2).to.be.equal(sum1);

    });
});
